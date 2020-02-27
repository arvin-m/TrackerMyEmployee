const inquirer = require('inquirer');
const db=require("./db/connection");

const cTable = require('console.table');


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
// console.log(answer);
switch(answer.questions){
    case "add_departments":addDepartment();
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
   

function addDepartment(){
    console.log("add department");
    start();

// promt to the user all departments

};


function addRols(){
    console.log("add rols");
    start();
    // promt to the user all the rols
    


};

function addEmployees(){
    console.log("add employee");
    start();



};

function viewDepartments(){
    console.log("view department");
    start();

    // show all the departments


};

function viewRoles(){
    // console.log("view roles");
    db.viewRoles();
    start();

    // show all the rols




};
function viewEmployees(){
    // console.log("view employee");
    
    db.viewEmployees();
    
    start();
// show all employee


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
    console.log("See You Later  ....");
    

    process.exit();

}








