const express = require('express');
const { body } = require('express-validator');
const { login, register } = require('../controllers/authController');

const router = express.Router();

router.post('/login', [
  body('email').isEmail().withMessage('Format email tidak valid'),
  body('password').notEmpty().withMessage('Password wajib diisi')
], login);

router.post('/register', [
  body('nik').notEmpty(),
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('position').notEmpty(),
  body('baseSalary').isNumeric(),
  body('departmentId').notEmpty()
], register);

module.exports = router;
