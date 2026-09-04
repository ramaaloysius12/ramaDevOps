const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const applyLeave = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, startDate, endDate, reason } = req.body;
    const attachment = req.file ? req.file.filename : null;

    if (!type || !startDate || !endDate || !reason) {
      return res.status(400).json({ success: false, error: 'Semua field wajib diisi' });
    }

    const leave = await prisma.leave.create({
      data: {
        userId,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        attachment
      },
      include: { user: true }
    });

    // Kirim Notifikasi ke Manager/Admin via Socket.io
    const io = req.app.get('io');
    io.emit('new_leave_request', { 
      message: `Pengajuan cuti baru dari ${leave.user.name}`,
      leaveId: leave.id 
    });

    res.status(201).json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await prisma.leave.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const approveLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // APPROVED or REJECTED
    const approverId = req.user.id;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Status tidak valid' });
    }

    const leave = await prisma.leave.update({
      where: { id },
      data: {
        status,
        approvedBy: approverId,
        approvedAt: new Date()
      }
    });

    // Kirim notifikasi ke user yang bersangkutan
    const io = req.app.get('io');
    io.to(leave.userId).emit('leave_status_updated', {
      message: `Pengajuan cuti Anda telah ${status === 'APPROVED' ? 'Disetujui' : 'Ditolak'}`
    });

    res.json({ success: true, data: leave });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { applyLeave, getMyLeaves, approveLeave };
