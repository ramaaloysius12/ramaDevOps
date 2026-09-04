const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// Dashboard Admin Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count({ where: { isActive: true } });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const presentToday = await prisma.attendance.count({
      where: { date: today, status: 'HADIR' }
    });

    const lateToday = await prisma.attendance.count({
      where: { date: today, status: 'TERLAMBAT' }
    });

    res.json({
      success: true,
      data: { totalUsers, presentToday, lateToday }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, nik: true, name: true, email: true, role: true, department: true, isActive: true }
    });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { department: true }
    });
    delete user.passwordHash;
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    let photoUrl = req.file ? req.file.filename : undefined;

    const dataToUpdate = { name };
    if (photoUrl) dataToUpdate.photoUrl = photoUrl;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: dataToUpdate
    });
    
    delete updatedUser.passwordHash;
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getDashboardStats, getAllUsers, getProfile, updateProfile };
