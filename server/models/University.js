const db = require('../config/db');

class University {
  static async initializeTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS universities (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          city VARCHAR(100) NOT NULL,
          description TEXT,
          website VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      console.log('✅ Таблица "universities" проверена/создана');
    } catch (error) {
      console.error('❌ Ошибка при создании таблицы "universities":', error);
    }
  }

  // Создание университета
  static async create({ user_id, name, city, description, website }) {
    const [result] = await db.query(
      'INSERT INTO universities (user_id, name, city, description, website) VALUES (?, ?, ?, ?, ?)',
      [user_id, name, city, description, website]
    );
    return result.insertId;
  }

  // Найти университет по ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM universities WHERE id = ?', [id]);
    return rows[0];
  }

  // Найти университет по user_id
  static async findByUserId(user_id) {
    const [rows] = await db.query('SELECT * FROM universities WHERE user_id = ?', [user_id]);
    return rows[0];
  }

  // Получить все университеты
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM universities ORDER BY created_at DESC');
    return rows;
  }

  // Обновить данные университета
  static async update(id, { name, city, description, website }) {
    const [result] = await db.query(
      'UPDATE universities SET name = ?, city = ?, description = ?, website = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, city, description, website, id]
    );
    return result.affectedRows;
  }

  // Удалить университет
  static async delete(id) {
    const [result] = await db.query('DELETE FROM universities WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

University.initializeTable();

module.exports = University;
