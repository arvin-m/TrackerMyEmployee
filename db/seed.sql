USE employee_tracker;
INSERT INTO department(name)
 VALUES ("Finance"),
		("Research"),
		("IT"),
		("development"),
		("Product");

INSERT INTO role(title,salary,department_id)
 VALUES ("SOFTWARE DEVELOPERS",80000,2),
		("Product Manager",120000,1),
		("Technical Lead",90000,3),
		("Marketing",95000,4),
		("Accounting",80000,5);
        
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ("Fred","Smith",null), -- manager
		("John","Doe",2,3),
		("paula","Jonson",3,1),
		("Will","Jackson",4,1),
		("Sara","Watson",5,4),
		("Tom","Smith",2,3),
		("Mike","Palmer",4,1)
 

 