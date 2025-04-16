const db = require('../config/db');

class Vacancy {
  // Проверка и создание таблицы
  static async initializeTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS vacancies (
          id INT AUTO_INCREMENT PRIMARY KEY,
          employer_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          required_education ENUM('Среднее', 'Среднее специальное', 'Высшее'),
          competencies TEXT,
          salary DECIMAL(10,2),
          city VARCHAR(100) NOT NULL, -- Город вакансии
          employment_type ENUM('Полный день', 'Частичная занятость', 'Удалённая работа', 'Стажировка') NOT NULL, -- Тип занятости
          experience ENUM('Без опыта', 'От 1 года', 'От 3 лет', 'От 5 лет') NOT NULL, -- Требуемый опыт работы
          schedule ENUM('Гибкий', 'Сменный', 'Вахтовый', 'Стандартный') NOT NULL, -- График работы
          contact_email VARCHAR(255), -- Email для связи
          contact_phone VARCHAR(20), -- Телефон для связи
          status ENUM('Активная', 'Закрытая') DEFAULT 'Активная', -- Статус вакансии
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (employer_id) REFERENCES employers(id) ON DELETE CASCADE
        );
      `);
      console.log('✅ Таблица "vacancies" проверена/создана');
    } catch (error) {
      console.error('❌ Ошибка при создании таблицы "vacancies":', error);
    }
  }

  // Создание новой вакансии
  static async create(vacancyData) {
    const {
      employer_id, title, description, required_education, competencies,
      salary, city, employment_type, experience, schedule, contact_email, contact_phone
    } = vacancyData;

    const [result] = await db.query(
      `INSERT INTO vacancies 
      (employer_id, title, description, required_education, competencies, salary, city, 
       employment_type, experience, schedule, contact_email, contact_phone) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [employer_id, title, description, required_education, competencies, salary, city,
        employment_type, experience, schedule, contact_email, contact_phone]
    );
    
    return result.insertId;
  }

  // Найти вакансию по ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM vacancies WHERE id = ?', [id]);
    return rows[0];
  }

  // Найти вакансии по работодателю
  static async findByEmployer(employer_id) {
    const [rows] = await db.query('SELECT * FROM vacancies WHERE employer_id = ?', [employer_id]);
    return rows;
  }

  // Получить все вакансии
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM vacancies ORDER BY created_at DESC');
    return rows;
  }

  // Обновить статус вакансии
  static async updateStatus(id, status) {
    const [result] = await db.query('UPDATE vacancies SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  }

  // Удалить вакансию
  static async delete(id) {
    const [result] = await db.query('DELETE FROM vacancies WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

Vacancy.initializeTable();

module.exports = Vacancy;
