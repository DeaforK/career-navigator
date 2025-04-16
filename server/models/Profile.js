const db = require('../config/db');

class Profile {
  static async initializeTable() {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS profiles (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT UNIQUE NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          birth_date DATE,
          education_level ENUM('Среднее', 'Среднее специальное', 'Высшее'),
          city VARCHAR(100),
          about TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
      console.log('✅ Таблица "profiles" проверена/создана');
    } catch (error) {
      console.error('❌ Ошибка при создании таблицы "profiles":', error);
    }
  }

  static async create({ user_id, full_name, phone, birth_date, education_level, city, about }) {
    const [result] = await db.query(
      'INSERT INTO profiles (user_id, full_name, phone, birth_date, education_level, city, about) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, full_name, phone, birth_date, education_level, city, about]
    );
    return result.insertId;
  }

  static async findByUserId(user_id) {
    const [rows] = await db.query('SELECT * FROM profiles WHERE user_id = ?', [user_id]);
    return rows[0];
  }
}

Profile.initializeTable();

module.exports = Profile;
