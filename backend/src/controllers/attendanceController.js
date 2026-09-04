const { PrismaClient } = require('@prisma/client');
const { calculateDistance } = require('../utils/geofencing');
const exceljs = require('exceljs');
const PDFDocument = require('pdfkit');

const prisma = new PrismaClient();

const checkIn = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const userId = req.user.id;
    const file = req.file;

    if (!lat || !lng || !file) {
      return res.status(400).json({ success: false, error: 'Lokasi dan foto wajib disertakan' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { department: { include: { location: true } } }
    });

    const office = user.department.location;
    const distance = calculateDistance(parseFloat(lat), parseFloat(lng), office.lat, office.lng);

    if (distance > office.radius) {
      return res.status(403).json({ success: false, error: `Anda di luar radius kantor. Jarak: ${distance}m (Maks: ${office.radius}m)` });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await prisma.attendance.findFirst({
      where: { userId, date: today }
    });

    if (existingAttendance) {
      return res.status(400).json({ success: false, error: 'Anda sudah melakukan check-in hari ini' });
    }

    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    let status = 'HADIR';
    if (hours > 8 || (hours === 8 && minutes > 0)) {
      status = 'TERLAMBAT';
    }
    if (hours >= 9) {
      status = 'ALPHA';
    }

    const attendance = await prisma.attendance.create({
      data: {
        userId,
        date: today,
        checkInTime: currentTime,
        checkInPhoto: file.filename,
        checkInLat: parseFloat(lat),
        checkInLng: parseFloat(lng),
        status
      }
    });

    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;

    if (!file) return res.status(400).json({ success: false, error: 'Foto check-out wajib disertakan' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.findFirst({
      where: { userId, date: today }
    });

    if (!attendance || !attendance.checkInTime) {
      return res.status(400).json({ success: false, error: 'Anda belum check-in hari ini' });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ success: false, error: 'Anda sudah check-out hari ini' });
    }

    const checkOutTime = new Date();
    const workingMs = checkOutTime - new Date(attendance.checkInTime);
    const workingHours = workingMs / (1000 * 60 * 60);

    const updatedAttendance = await prisma.attendance.update({
      where: { id: attendance.id },
      data: {
        checkOutTime,
        checkOutPhoto: file.filename,
        workingHours
      }
    });

    res.json({ success: true, data: updatedAttendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const attendances = await prisma.attendance.findMany({
      where: {
        userId,
        date: { gte: startDate, lte: endDate }
      },
      orderBy: { date: 'asc' }
    });

    res.json({ success: true, data: attendances });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const exportExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const attendances = await prisma.attendance.findMany({ where: { userId } });

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Riwayat Absensi');

    worksheet.columns = [
      { header: 'Tanggal', key: 'date', width: 15 },
      { header: 'Check In', key: 'checkInTime', width: 20 },
      { header: 'Check Out', key: 'checkOutTime', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Jam Kerja', key: 'workingHours', width: 15 },
    ];

    attendances.forEach(att => {
      worksheet.addRow({
        date: att.date.toISOString().split('T')[0],
        checkInTime: att.checkInTime ? att.checkInTime.toISOString() : '-',
        checkOutTime: att.checkOutTime ? att.checkOutTime.toISOString() : '-',
        status: att.status,
        workingHours: att.workingHours ? att.workingHours.toFixed(2) : 0
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=absensi.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const exportPDF = async (req, res) => {
  try {
    const userId = req.user.id;
    const attendances = await prisma.attendance.findMany({ where: { userId } });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=absensi.pdf');
    doc.pipe(res);

    doc.fontSize(16).text('Riwayat Absensi', { align: 'center' });
    doc.moveDown();

    attendances.forEach(att => {
      const date = att.date.toISOString().split('T')[0];
      const status = att.status;
      doc.fontSize(12).text(`Tanggal: ${date} | Status: ${status} | Jam Kerja: ${att.workingHours?.toFixed(2) || 0} Jam`);
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { checkIn, checkOut, getHistory, exportExcel, exportPDF };
