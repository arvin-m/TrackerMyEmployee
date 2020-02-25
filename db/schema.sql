        DROP DATABASE IF EXISTS employee_tracker;
        CREATE DATABASE employee_tracker;
         

        CREATE TABLE department(

        id INT  auto_increment NOT NULL,
        name  VARCHAR(30) , -- to hold department name
        primary key (id)

        );
        CREATE TABLE role(
        id INT auto_increment,-- PRIMARY KEY
        title  VARCHAR(30) , -- to hold role title
        salary  DECIMAL, -- to hold role salary,
        department_id  INT, -- to hold reference to department role belongs to,
        primary key (id),
        FOREIGN KEY (department_id) REFERENCES department(id)

        );
        CREATE TABLE employee(

        id  INT auto_increment, -- PRIMARY KEY
        first_name  VARCHAR(30), -- to hold employee first name
        last_name  VARCHAR(30), -- to hold employee last name
        role_id  INT,  -- to hold reference to role employee has
        manager_id INT ,-- to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
        primary key (id),
        FOREIGN KEY (role_id) REFERENCES role(id),
        FOREIGN KEY (manager_id) REFERENCES employee(id)
        )

