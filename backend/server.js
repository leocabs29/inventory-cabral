const express = require("express");
const db = require('./db'); // Import database connection
const app = express();
const cors = require("cors");

const port = 3000;

app.use(cors());
app.use(express.json());
// Create MySQL connection


// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("adasd");
    return;
  }
  console.log("✅ Connected to MySQL Database");
});


app.get("/products", (req, res) => {
    const sql = "SELECT * FROM product"; // Change 'your_table_name' to your actual table name
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error("❌ Error fetching data:", err);
        res.status(500).json({ error: "Database query failed" });
      } else {
        res.json(results); // Send all data as JSON
      }
    });
  });

  app.get("/categories", (req, res) => {
    const sql = "SELECT * FROM categories"; // Change 'your_table_name' to your actual table name
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error("❌ Error fetching data:", err);
        res.status(500).json({ error: "Database query failed" });
      } else {
        res.json(results); // Send all data as JSON
      }
    });
  });
  
  

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
