const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Qwerty@123",
  database: "school",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.query("CREATE DATABASE IF NOT EXISTS school", (err) => {
  if (err) throw err;
  console.log("✅ Database 'school' is ready");
});
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`;

db.query(createTableQuery, (err) => {
  if (err) throw err;
  console.log(" Table 'students' is ready");
});

module.exports = db;
