const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "", // เพิ่มรหัสผ่านของ root หากมี
  database: "subjects",
  port: 3306, // หากใช้พอร์ตเริ่มต้น
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
    return;
  }
  console.log("Connected to the database!");
});

module.exports = db;
