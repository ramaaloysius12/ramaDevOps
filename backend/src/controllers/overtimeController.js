const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const applyOvertime = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, startTime, endTime, description } = req.body;

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    
    if (end <= start) {
      return res.status(400).json({ success: false, error: 'Jam selesai harus lebih besar dari jam mulai' });
    }

    const overtime = await prisma.overtime.create({
      data: {
        userId,
        date: new Date(date),
        startTime: start,
        endTime: end,
        description
      },
      include: { user: true }
    });

    const io = req.app.get('io');
    io.emit('new_overtime_request', { 
      message: `Pengajuan lembur baru dari ${overtime.user.name}` 
    });

    res.status(201).json({ success: true, data: overtime });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getMyOvertimes = async (req, res) => {
  try {
    const overtimes = await prisma.overtime.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: overtimes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const approveOvertime = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const approverId = req.user.id;

    const overtime = await prisma.overtime.findUnique({ where: { id }, include: { user: true } });
    if (!overtime) return res.status(404).json({ success: false, error: 'Data lembur tidak ditemukan' });

    let totalPay = 0;
    if (status === 'APPROVED') {
      const hoursMs = overtime.endTime - overtime.startTime;
      const hours = hoursMs / (1000 * 60 * 60);
      const baseSalary = overtime.user.baseSalary;
      const hourlyRate = baseSalary / 173; // Standar Depnaker

      if (hours > 1) {
        totalPay = (1.5 * hourlyRate) + ((hours - 1) * 2 * hourlyRate);
      } else {
        totalPay = hours * 1.5 * hourlyRate;
      }
    }

    const updatedOvertime = await prisma.overtime.update({
      where: { id },
      data: { status, approvedBy: approverId, totalPay }
    });

    res.json({ success: true, data: updatedOvertime });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { applyOvertime, getMyOvertimes, approveOvertime };
