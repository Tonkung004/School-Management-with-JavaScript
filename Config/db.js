const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "", // ใส่รหัสผ่านของ root ถ้ามี
  database: "students",
  port: 3306, // ใส่พอร์ต 3306 หากไม่ได้เปลี่ยนค่าเริ่มต้น
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
    return;
  }
  console.log("Connected to the database!");
});

module.exports = db;
