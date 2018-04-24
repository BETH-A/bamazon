var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  // run the displayItems function after the connection is made to prompt the user
  displayItems();
  
});

function displayItems() {
  connection.query("SELECT * FROM products;", function(error, results, fields) {
    results.forEach((element, index) => {
      let id    = element.item_id;
      let name  = element.product_name;
      let dept  = element.department_name;
      let price = element.price;

      console.log(id + " " + name + " " + dept + " " + price);
    });
    start(results);

  });
}

function start(products) {

  var choicesArray = [];
    products.forEach((element, index) => {
      let id    = element.item_id;
      let name  = element.product_name; 
      console.log(id)
      choicesArray.push(id);
    });

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you item would you like to buy?",
      choices: choicesArray
    })
    .then(function(answer) {
      var query = "SELECT price, stock_quantity FROM products WHERE ?";
      connection.query(query, { choices: answer.item_id }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Item: " + res[i].item_id + " || Price: " + res[i].price + " || Quantity Available: " + res[i].stock_quantity);
        }
        start();
      });
    });
}
