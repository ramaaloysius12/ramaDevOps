const express = require('express');
const { checkIn, checkOut, getHistory, exportExcel, exportPDF } = require('../controllers/attendanceController');
const { authenticateToken } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.use(authenticateToken);

router.post('/check-in', upload.single('photo'), checkIn);
router.post('/check-out', upload.single('photo'), checkOut);
router.get('/history', getHistory);
router.get('/export/excel', exportExcel);
router.get('/export/pdf', exportPDF);

module.exports = router;
