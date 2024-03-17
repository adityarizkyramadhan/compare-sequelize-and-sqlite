const sqlite3 = require('sqlite3').verbose();

// Buat atau buka koneksi ke basis data SQLite
const db = new sqlite3.Database('./database_sqlx.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
    return;
  }
  console.log('Connected to the SQLite database.');
});

// Buat tabel jika belum ada menggunakan sqlite3
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS example_table (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table "example_table" created (if not exists).');
    }
  });
});

// Method untuk operasi CRUD dengan SQLx
const create = async (name) => {
  return db.run(`INSERT INTO example_table (name) VALUES (?)`, [name]);
};

const read = async (id) => {
  return db.get(`SELECT * FROM example_table WHERE id = ?`, [id]);
};

const update = async (id, newName) => {
  return db.run(`UPDATE example_table SET name = ? WHERE id = ?`, [newName, id]);
};

const destroy = async (id) => {
  return db.run(`DELETE FROM example_table WHERE id = ?`, [id]);
};

module.exports = {
  create,
  read,
  update,
  destroy,
};
