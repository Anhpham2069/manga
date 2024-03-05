const express = require('express');
const router = express.Router();
const authController = require('../controllers/users');
const checkAuth = require('../middleware/auth');
const validate = require('../middleware/validate'); // Thêm middleware validation

// Đăng ký tài khoản
router.post('/register', validate.register, authController.register);

// Đăng nhập tài khoản
router.post('/login', validate.login, authController.login);

// Chỉnh sửa thông tin tài khoản (yêu cầu xác thực)
router.put('/edit-profile', checkAuth, validate.editProfile, authController.editProfile);

// Đổi mật khẩu (yêu cầu xác thực)
router.put('/change-password', checkAuth, validate.changePassword, authController.changePassword);

module.exports = router;
