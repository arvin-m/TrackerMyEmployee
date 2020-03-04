const inquirer = require('inquirer');
const db = require("./db/connection");
const c = require('ansi-colors');
// const cTable = require('console.table');
const CFonts = require('cfonts');
CFonts.say('Employee |Tracker ', {

  font: 'block',              // define the font face
  align: 'center',              // define text alignment
  colors: ['system'],         // define all colors
  background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1,           // define letter spacing
  lineHeight: 1,              // define the line height
  space: true,                // define if the output text should have empty lines on top and on the bottom
  maxLength: '0',             // define how many character can be on one line
  gradient: ['#9c27b0', '#00bcd4', '#e91e63'],            // define your two gradient colors
  independentGradient: true, // define if you want to recalculate the gradient for each new line
  transitionGradient: true,  // define if this is a transition between colors directly
  env: 'node'                 // define the environment CFonts is being executed in
});

start();


function start() {


  inquirer
    .prompt([
      {
        name: "questions",
        type: "rawlist",
        message: "What Would Like To Do ?",
        choices: [
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
            name: "Update Employees",
            value: "update_employees"
          },
          {
            name: "Quit",
            value: "quit"
          }

        ]
      }
    ]).then(answer => {
      // console.log("---------->>>",answer);
      switch (answer.questions) {
        case "add_departments": addDepartments();
          break;

        case "add_roles": addRols();
          break;

        case "add_employees": addEmployees();
          break;

        case "view_departments": viewDepartments();
          break;

        case "view_roles": viewRoles();
          break;

        case "view_employees": viewEmployees();
          break;

        case "update_employees": updateEmployeesRole();
          break;

        default: quit();

      }

    })

};


function addDepartments() {

  inquirer
    .prompt([{
      name: "name",
      type: "string",
      message: "Witch department would you like to add ?",
      validate: function (input) {
        if (input != '') {
          return true;

        }
        return "the input cannot be empty !"
      }

    }]).then(newDepartment => {

      let department = newDepartment.name;
      db.addDepartment(department);
    }).then(err => {
      if (err) throw err;
      start();
    })



};


function addRols() {
  db.viewDepartments(function (err, result) {

    console.log(c.yellow(" Print The Department Table To See the Department ID :"));


    inquirer
      .prompt([{
        name: "departmentID",
        type: "number",
        message: "insert the department ID ?"

      },
      {
        name: "title",
        type: "string",
        message: "Witch role would you like to add ?",
        validate: function (input) {
          if (input != '') {
            return true;

          }
          return "the input cannot be empty !"
        }

      },
      {
        name: "salary",
        type: "number",
        message: "Insert the salary ?",
        validate: function (input) {
          if (input != '') {
            return true;

          }
          return "the input cannot be empty !"
        }

      }
      ]).then(newRole => {
        const role = newRole.title;
        const salary = newRole.salary;
        const depId = newRole.departmentID;

        db.addRole(role, salary, depId);

      })

  });
}




function addEmployees() {
  db.viewEmployees();
  console.log(c.yellow(" Print The employee and department Table To See the Department ID and Manager ID:"));
  db.viewRoles(function (err, res) {
    // console.log(res);
    inquirer
      .prompt([ {
        name: "managerID",
        type: "number",
        message: "insert the maneger ID ?",
        validate: function (input) {
          if (input != '') {
            return true;

          }
          return "the input cannot be empty !"
        }

      },
      {
        name: "roleID",
        type: "number",
        message: "insert the role ID ?",
        validate: function (input) {
          if (input != '') {
            return true;

          }
          return "the input cannot be empty !"
        }

      },
      {
        name: "firstName",
        type: "string",
        message: "Insert the first name ?",
        validate: function (input) {
          if (input != '') {
            return true;

          }
          return "the input cannot be empty !"
        }

      },
      {
        name: "lastName",
        type: "string",
        message: "INsert the last name ?",
        validate: function (input) {
          if (input != '') {
            return true;

          }
          return "the input cannot be empty !"
        }

      }]).then(newEmployee => {

        const firstName = newEmployee.firstName;
        const lastName = newEmployee.lastName;
        const roleID = newEmployee.roleID;
        const managerID = newEmployee.managerID;

        db.addEmployees(firstName, lastName, roleID, managerID);
      }).catch(err => {
        throw err;
        start();
      })
  });

};

function viewDepartments() {

  db.viewDepartments(cb=>{

    start();
  });
};

function viewRoles() {

  db.viewRoles(cb=>{

    start();

  });

  

};
function viewEmployees() {

  db.viewEmployees(cd=>{

    start();
  });

};

function updateEmployeesRole() {
  
  db.updateEmployeeRole(function(data){
    console.log("in promt file",data);
    inquirer
    .prompt([
      {
        name:"choseEmployee",
        message:"Pick an employee to update?",
        type:"list",
        choices:data
      }
    ]).then((answer)=>{
      console.log(" id of employee to update",answer.choseEmployee.split(" ")[0]);
      db.viewRoles(function(data){
        // console.log(" roles in index file ",data);
        let roleArr=[];
        data.forEach(role => {

          roleArr.push(role.id+" "+role.title);          
        });
        console.log(roleArr);
        inquirer
        .prompt([
          {
            name:"newRole",
            message:"Pick an employee role?",
            type:"list",
            choices:roleArr
          }
        ]).then((roleAnswer)=>{
          console.log(" id of role to update",roleAnswer.newRole.split(" ")[0]);
          console.log(roleAnswer);
          let employeeId=answer.choseEmployee.split(" ")[0];
          let roleId=roleAnswer.newRole.split(" ")[0];
          db.sqlUpdateRole(employeeId,roleId);
        })

      });

    })

  });
  
};

function quit() {
  console.log(c.yellow("See You Later  ...."));
  process.exit();
};












