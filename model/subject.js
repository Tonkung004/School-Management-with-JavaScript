const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "subjects",
});

db.query(
  `
    CREATE TABLE IF NOT EXISTS subject (
        idSubject VARCHAR(8),
        PRIMARY KEY(idSubject),
        name text,
        credit INT(1)
    );
`,
  (err, result) => {
    if (err) throw err;
    console.log("Created table success!!");
  }
);

db.end();
