const mysql = require('mysql2');
const express = require('express');
const { json } = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'iPrevail15!',
        database: 'employees'
    },
    console.log('Connected to the employees database.')
)

// View all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
})

// Create  a department
app.post('/api/department', ({ body}, res) => {
    const sql = `INSERT INTO department (name)
        VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400),json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})

// // View all roles
// db.query(`SELECT * FROM role`, (err, rows) => {
//     console.log(rows);
// })

// // View all employees
// db.query(`SELECT * FROM employee`, (err, rows) => {
//     console.log(rows);
// })

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});