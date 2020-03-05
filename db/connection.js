const mysql = require("mysql");
// const cTable = require('console.table');
const c = require('ansi-colors');
const { printTable } = require('console-table-printer');


const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "employee_tracker"
  });
  
  // connection.connect(function(err) {
      
  //   if (err) throw err;
  //   //Make sure we're calling our runSearch function ONLY AFTER our connection to the database was successfully established
    
  //   console.log("\n");
  //   console.log("You Are Connecting To The dataBase ...");
  // });
  
const data ={
   viewEmployees: function(cb) {
   
    let query = "SELECT * FROM employee GROUP BY first_name";
    connection.query(query, (err, res) => {
      printTable(res);
      console.log("\n");
      if (cb) cb(err, res);
      

      
      // res.forEach(dataRow => printTable([dataRow]) );
      // console.log(condataRow);
      
    })
  },
    viewRoles: function(cb) {
    
    let query = "SELECT * FROM Role ";
    connection.query(query, (err, res) => {
      console.log("\n");
      printTable(res);
      // if (cb) cb(res);
      cb(res);
      
      
    });
  },
  viewDepartments: function(cb) {
    
    let query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
      console.log("\n");
       printTable(res) ;       
       if (cb) cb(err, res);

    })
  },
    addDepartment(department,cb){
    console.log("inside the connection---> ",department);
    let query= `INSERT INTO department(name) VALUES ("${department}")`;
    
    connection.query(query,(err,res)=>{
      console.log("\n");
     cb(console.log(c.green(`New ${department} Department Created Successfully !`)));
      
    
    })
    

  },
  addRole(role,salary,depId,cb){
    
    
    let query= `INSERT INTO role(title,salary,department_id) VALUES ("${role}","${salary}","${depId}")`;
      connection.query(query,(err,res)=>{
      console.log("\n");      
      cb(console.log(c.green(`New ${role} Role Created Successfully !`)));

  })

  },
  addEmployees(firstName,lastName,roleID,managerID,cb){
    let query= `INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ("${firstName}","${lastName}","${roleID}","${managerID}")`;
      connection.query(query,(err,res)=>{
      console.log("\n");      
      cb(console.log(c.green(`New Employee ${firstName} ${lastName} Created Successfully !`)));

  })

  },
  // Update the employee role after getting data from updateEmployeeRole FUNCTION in the bottom
  sqlUpdateRole(employeeId,roleId,cb){
    
    let query=`UPDATE employee SET  role_id =("${roleId}") 
     WHERE id=("${employeeId}") `;
     connection.query(query,(err,res)=>{
       cb(console.log(c.green("Update Employee Role Successfully ! ")));

     })
  },
  // Geting the information for the employee to update theire role
  updateEmployeeRole(cb){
    
    let allEmployeeQuery=`Select id,first_name,last_name 
    from employee `;    
    
      connection.query(allEmployeeQuery,(err,res)=>{
      
      let employeeName=[];
      const choices =res.forEach(element => {
        let id =element.id;
        let name=element.first_name;
        let lastName=element.last_name;
        // console.log(id+"-"+name +" "+ lastName )
        employeeName.push(id+" "+name +" "+lastName);
        
      });
      cb(employeeName);

   

})

  }





  
    














};






 

  module.exports=data;


