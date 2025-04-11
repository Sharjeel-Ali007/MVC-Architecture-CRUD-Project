const db = require("../db/db");

const Student = {
  getAll: (callback) => {
    db.query("SELECT * FROM students", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM students WHERE id = ?", [id], callback);
  },

  create: (name, callback) => {
    db.query("INSERT INTO students (name) VALUES (?)", [name], callback);
  },

  update: (id, name, callback) => {
    db.query("UPDATE students SET name = ? WHERE id = ?", [name, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM students WHERE id = ?", [id], callback);
  },
};

module.exports = Student;
