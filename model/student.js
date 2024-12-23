const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "students",
});

db.query(
  `
    CREATE TABLE IF NOT EXISTS student (
        idStd VARCHAR(10),
        PRIMARY KEY(idStd),
        name text
    );
`,
  (err, result) => {
    if (err) throw err;
    console.log("Created table success!!");
  }
);

db.end();
