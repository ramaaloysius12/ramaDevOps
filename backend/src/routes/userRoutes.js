const express = require('express');
const { getDashboardStats, getAllUsers, getProfile, updateProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/auth');
const { authorizeRoles } = require('../middlewares/role');
const upload = require('../middlewares/upload');

const router = express.Router();

router.use(authenticateToken);

// Karyawan
router.get('/profile', getProfile);
router.put('/profile', upload.single('photo'), updateProfile);

// Admin Only
router.get('/dashboard', authorizeRoles('ADMIN'), getDashboardStats);
router.get('/', authorizeRoles('ADMIN'), getAllUsers);

module.exports = router;
