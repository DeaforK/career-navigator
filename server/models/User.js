const db = require('../config/db');

class User {
  static async initializeTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role ENUM('абитуриент', 'работодатель', 'вуз') NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Таблица "users" проверена/создана');
    } catch (error) {
      console.error('❌ Ошибка при создании таблицы "users":', error);
    }
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findByPk(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  static async create({ email, password, role }) {
    const [result] = await db.query(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
      [email, password, role]
    );
    return result.insertId;
  }
}

// Вызываем инициализацию таблицы при загрузке модуля
User.initializeTable();

module.exports = User;
