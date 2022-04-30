const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// View all employees with title, salaries, and department
router.get('/employees', (req, res) => {
    const sql = `SELECT employee.*, role.title AS title, role.salary AS salary, department.name AS department
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
        console.table(rows);
    })
})

// Create an employee
router.post('/employee', ({body}, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})

module.exports = router;