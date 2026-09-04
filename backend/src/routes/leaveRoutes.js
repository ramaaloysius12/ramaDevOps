const express = require('express');
const { applyLeave, getMyLeaves, approveLeave } = require('../controllers/leaveController');
const { authenticateToken } = require('../middlewares/auth');
const { authorizeRoles } = require('../middlewares/role');
const upload = require('../middlewares/upload');

const router = express.Router();

router.use(authenticateToken);

// Karyawan
router.post('/apply', upload.single('attachment'), applyLeave);
router.get('/my-leaves', getMyLeaves);

// Manager / Admin
router.put('/approve/:id', authorizeRoles('ADMIN', 'MANAGER'), approveLeave);

module.exports = router;
