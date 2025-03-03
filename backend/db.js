const mysql = require('mysql2');

// Connect to your database
const db = mysql.createConnection({
  host: 'localhost', // Your database host
  user: 'root',      // Your database username
  password: '1234',      // Your database password
  database: 'inventory-cabral' // Your database name
});

// Test the connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected successfully');
});

module.exports = db;
