INSERT INTO department (name)
VALUES
    ('IT'),
    ('HR'),
    ('Serious Business'),
    ('Funny Business'),
    ('Risky Business');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Manager', 100000, 4),
    ('Assistant Manager', 95000, 2),
    ('Assistant Assistant Manager', 90000, 1),
    ('Normal GUy', 50000, 5),
    ('Awesome Guy', 69000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Sergieo', 'Lopez', 1, 0),
    ('The', 'Serg', 2, 1),
    ('Mr.', 'Sergieo', 3, 1),
    ('Silly', 'Serg', 4, 1),
    ('Sexy', 'Serg', 5, 1);