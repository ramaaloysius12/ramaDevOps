const express = require('express');
const { applyOvertime, getMyOvertimes, approveOvertime } = require('../controllers/overtimeController');
const { authenticateToken } = require('../middlewares/auth');
const { authorizeRoles } = require('../middlewares/role');

const router = express.Router();

router.use(authenticateToken);
router.post('/apply', applyOvertime);
router.get('/my-overtimes', getMyOvertimes);
router.put('/approve/:id', authorizeRoles('ADMIN', 'MANAGER'), approveOvertime);

module.exports = router;
