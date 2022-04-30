const inquirer = require('inquirer');
const db = require('./db/connection');

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices: ['View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'
                    ]
        }
    ])
    .then(({choice}) => {
        if (choice === 'View all departments'){
            viewDepartments();
        } else if (choice === 'View all roles'){
            viewRoles();
        } else if (choice === 'View all employees'){
            viewEmployees();
        } else if (choice === 'Add a department'){
            addDepartment();
        } else if (choice ==='Add a role'){
            addRole();
        } else if (choice === 'Add an employee'){
            addEmployee();
        } else if (choice === 'Update an employee role')
    })
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the new department name:'
        }
    ])
    .then(answers => {
        const departmentName = answers.name;
        createDepartment(departmentName);
    })
}

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the new role:'
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'Enter the department id'
        }
    ])
    .then(answers => {
        const title = answers.title;
        const salary = answers.salary;
        const department_id = answers.department_id;
        createRole(title, salary, department_id);
    })
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter the new employee's first name:"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Enter the new employee's last name:"
        },
        {
            type: 'number',
            name: 'role_id',
            message: "Enter the new employee's role ID"
        },
        {
            type: 'number',
            name: 'manager_id',
            message: "Enter the new employee's manager ID"
        }
    ])
    .then(answers => {
        const first_name = answers.first_name;
        const last_name = answers.last_name;
        const role_id = answers.role_id;
        const manager_id = answers.manager_id;

        createEmployee(first_name, last_name, role_id, manager_id);
    })
}

const viewDepartments = () => {
    db.query(`SELECT * FROM department`, (err, rows) => {
        console.table(rows);
        promptMenu();
    })
}

const createDepartment = (name) => {
    const sql = `INSERT INTO department (name)
    VALUES (?)`;

    const params = [name];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('Department added to database.');
        promptMenu();
    })
}

const viewRoles = () => {
    const sql = `SELECT role.*, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        console.table(rows);
        promptMenu();
    })
}

const createRole = (title, salary, department_id) => {
    const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?,?,?)`;

    const params = [title, salary, department_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Role added to database.');
        promptMenu();
    })
}

const viewEmployees = () => {
    const sql = `SELECT employee.*, role.title AS title, role.salary AS salary, department.name AS department
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id;`;

    db.query(sql, (err, rows) => {
        console.table(rows);
        promptMenu();
    })
}

const createEmployee = (first_name, last_name, role_id, manager_id) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Employee added to database.');
        promptMenu();
    })
}

promptMenu();