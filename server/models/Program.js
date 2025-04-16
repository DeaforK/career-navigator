const db = require('../config/db');

class Program {
  // Создание таблицы при запуске
  static async initializeTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS programs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          university_id INT NOT NULL,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          faculty VARCHAR(255),
          entrance_exams TEXT,
          competencies TEXT,
          duration INT NOT NULL,
          type ENUM('Очная', 'Заочная', 'Очно-заочная', 'Дистанционная') NOT NULL DEFAULT 'Очная',
          price DECIMAL(10,2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE
        )
      `);
      console.log('✅ Таблица "programs" проверена/создана');
    } catch (error) {
      console.error('❌ Ошибка при создании таблицы "programs":', error);
    }
  }

  // Создание новой образовательной программы
  static async create({ university_id, name, description, faculty, entrance_exams, competencies, duration, type, price }) {
    const [result] = await db.query(
      `INSERT INTO programs (university_id, name, description, faculty, entrance_exams, competencies, duration, type, price) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [university_id, name, description, faculty, entrance_exams, competencies, duration, type, price]
    );
    return result.insertId;
  }

  // Получение всех программ
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM programs');
    return rows;
  }

  // Получение программы по ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM programs WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  }

  // Получение программ по университету
  static async findByUniversity(university_id) {
    const [rows] = await db.query('SELECT * FROM programs WHERE university_id = ?', [university_id]);
    return rows;
  }

  // Обновление программы
  static async update(id, { name, description, faculty, entrance_exams, competencies, duration, type, price }) {
    const [result] = await db.query(
      `UPDATE programs SET 
        name = ?, 
        description = ?, 
        faculty = ?, 
        entrance_exams = ?, 
        competencies = ?, 
        duration = ?, 
        type = ?, 
        price = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, description, faculty, entrance_exams, competencies, duration, type, price, id]
    );
    return result.affectedRows;
  }

  // Удаление программы
  static async delete(id) {
    const [result] = await db.query('DELETE FROM programs WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

// Инициализация таблицы при запуске
Program.initializeTable();

module.exports = Program;
