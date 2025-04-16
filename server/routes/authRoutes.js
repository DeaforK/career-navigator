const express = require('express');
const AuthController = require('../controllers/AuthController.js');

const router = express.Router();

// Маршрут для регистрации пользователя
router.post('/register', AuthController.register);

// Маршрут для входа в систему
router.post('/login', AuthController.login);

// Маршрут для входа в систему
router.post('/logout', AuthController.logout);

// Маршрут для проверки токена
router.get('/verify', AuthController.verifyToken);

module.exports = router;
