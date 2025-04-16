const express = require('express');
const VacanciesController = require('../controllers/VacanciesController');

const router = express.Router();

// Получение всех вакансий
router.get('/', VacanciesController.getAll);

// Получение всех вакансий
router.get('/employer/:employer_id', VacanciesController.getByEmployer);

// Получение вакансии по  ID
router.get('/:id', VacanciesController.getById);

// Создание новой вакансии
router.post('/', VacanciesController.create);

module.exports = router;
