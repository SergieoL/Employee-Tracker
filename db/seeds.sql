INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('IT');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Salesperson', 55000, 1),
    ('Lead Engineer', 85000, 2),
    ('Account Manager', 90000, 3),
    ('Legal Team Lead', 90000, 4),
    ('Network Administrator', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Chan', 5, 0),
    ('Ashley', 'Rodriguez', 1, 1),
    ('Kevin', 'Tupik', 3, 1),
    ('Sarah', 'Lourd', 4, 1),
    ('Tom', 'Allen', 2, 1);