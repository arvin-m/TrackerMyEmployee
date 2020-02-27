const mysql = require("mysql");
const cTable = require('console.table');
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
  
  connection.connect(function(err) {
      
    if (err) throw err;
    //Make sure we're calling our runSearch function ONLY AFTER our connection to the database was successfully established
    // runSearch();
    console.log("query connected...")
  });
  
const data ={
   viewEmployees: function() {
    //define a query that uses a GROUP BY clause to find all artists that appear more than once in the table
    let query = "SELECT * FROM employee GROUP BY first_name";
    connection.query(query, (err, res) => {
      console.log("\n");
      printTable(res);
      
      
      // res.forEach(dataRow => printTable([dataRow]) );
      // console.log(condataRow);
      
      
      
    })
  },
    viewRoles: function() {
    //define a query that uses a GROUP BY clause to find all artists that appear more than once in the table
    let query = "SELECT * FROM Role ";
    connection.query(query, (err, res) => {
      console.log("\n");
      printTable(res);
      
      
      // res.forEach(dataRow => printTable([dataRow]) );
      // console.log(condataRow);
      
      
      
    })
  }
};






 

  module.exports=data;


