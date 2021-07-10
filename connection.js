var mysql = require('mysql');
var connection = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'notes',
  charset: 'utf8mb4'
});


function runQuery(query, fields) {
  return new Promise((resolve, reject) => {
    try {
      connection.query(query, fields, function (err, rows, fields) {
        if (err) reject(err);
        resolve(rows);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

function runQueryRow(query, fields) {
  return new Promise((resolve, reject) => {
    try {
      connection.query(query, fields, function (err, rows, fields) {
        if (err) reject(err);
        if (rows) resolve(rows[0]);
        else resolve(false)
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

module.exports = {
  runQuery,
  runQueryRow
}
