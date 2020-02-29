const inquirer = require('inquirer');
const db=require("./db/connection");
const c = require('ansi-colors');

// const cTable = require('console.table');



start();


function start(){
    

    inquirer
    .prompt([
        {
            name:"questions",
            type:"rawlist",
            message:"What Would Like To Do ?",
            choices:[
                 {
                    name: "Add Departments",
                    value: "add_departments"
                  },
                  {
                    name: "Add Roles",
                    value: "add_roles"
                  },
                  {
                    name: "Add Employees",
                    value: "add_employees"
                  },
                  {
                    name: "View Departments",
                    value: "view_departments"
                  },
                  {
                    name: "View Roles",
                    value: "view_roles"
                  },
                  {
                    name: "View Employees",
                    value: "view_employees"
                  },
                  {
                    name: "Update Departments",
                    value: "update_departments"
                  },
                  {
                    name: "Update Roles",
                    value: "update_roles"
                  },
                  {
                    name: "Update Employees",
                    value: "update_employees"
                  },
                  {
                    name: "Quit",
                    value: "quit"
                  }
                
            ]
        }
    ]).then(answer=>{
// console.log("---------->>>",answer);
switch(answer.questions){
    case "add_departments":addDepartments();
    break;

    case "add_roles":addRols();
    break;

    case "add_employees":addEmployees();
    break;

    case "view_departments":viewDepartments();
    break;

    case "view_roles":viewRoles();
    break;

    case "view_employees":viewEmployees();
    break;

    case "update_departments":updateDepartments();
    break;

    case "update_roles":updateRoles();
    break;

    case "update_employees":updateEmployees();
    break;

    default:quit();
    
}
   
    })

    };
   

function addDepartments(){
    
    inquirer
    .prompt([{
      name:"name",
      type:"string",
      message:"Witch department would you like to add ?"
      
    }]).then(newDepartment=>{
      
      let department = newDepartment.name;
      db.addDepartment(department);
    }).then(err =>{
      if (err) throw err;
      start();
    }) 
    


};


function addRols(){
  viewDepartments();
  console.log(c.yellow(" Print The Department Table To See the Department ID :"));

    
    inquirer
    .prompt([{
      name:"title",
      type:"string",
      message:"Witch role would you like to add ?"
      
    },
    {
      name:"salary",
      type:"number",
      message:"INsert the salary ?"
      
    },
    {
      name:"departmentID",
      type:"number",
      message:"insert the department ID ?"
      
    }]).then(newRole=>{      
      const role = newRole.title;
      const salary =newRole.salary;
      const depId=newRole.departmentID;

      // if(role != "" & salary === Number){
          db.addRole(role,salary,depId);
      // }

      })
      // .then(err =>{
      //   if (err) throw err;
      //   start();
      // }) 
    }
        

  

function addEmployees(){
  db.viewEmployees();
  console.log(c.yellow(" Print The employee and department Table To See the Department ID and Manager ID:"));
  db.viewDepartments();
  
  inquirer
    .prompt([{
      name:"firstName",
      type:"string",
      message:"Insert the first name ?"
      
    },
    {
      name:"lastName",
      type:"string",
      message:"INsert the last name ?"
      
    },
    {
      name:"roleID",
      type:"number",
      message:"insert the role ID ?"
      
    },
    {
      name:"managerID",
      type:"number",
      message:"insert the maneger ID ?"
      
    }
  ]).then(newEmployee=>{
    
    const firstName=newEmployee.firstName;
    const lastName=newEmployee.lastName;
    const roleID=newEmployee.roleID;
    const managerID=newEmployee.managerID;
    db.addEmployees(firstName,lastName,roleID,managerID);
  }).then(err =>{
    if (err) throw err;
    start();
  })    

};

function viewDepartments(){
   
    db.viewDepartments();
    start();   
};

function viewRoles(){
  
    db.viewRoles();
    start();

};
function viewEmployees(){
     
    db.viewEmployees();    
    start();

};
function updateDepartments(){
    console.log(" update department");
    start();

};
function updateRoles(){
    console.log("update roles");
    start();
};
function updateEmployees(){
    console.log("update employee");
    start();
};

function quit(){
    console.log(c.yellow("See You Later  ....")); 
    
    
    process.exit();

    
};








    



