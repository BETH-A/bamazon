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

function displayItems(){
	connection.query('SELECT item_id, product_name, price FROM products WHERE stock_quantity > 0;', function(err, res){
		console.log("Currently available products:");
		// Create a table
		var table = new Table({
		    head: ['Product ID', 'Product Name', 'Price']
		});
		// Add rows to table
		for(key in res){
			table.push([res[key].item_id, res[key].product_name, '$'+res[key].price.toFixed(2)]);
		}
		// Print table
		console.log(table.toString());
		
		purchaseItem();
	});
}

//Prompt for item & quantity for user to purchase
var purchaseItem = function(){

	inquirer.prompt([
	{
		name: 'itemID',
		message: 'Enter the item number you would like to purchase'
	},
	{
		name: 'qty',
		message: 'How many units would you like to purchase?'
	}
	]).then(function(ans){
		if(ans.qty < 1){
			console.log("To make a purchase, you must enter at least 1 unit for purchase.");
		}
		else{
			// Get item and quantity from database
			connection.query('SELECT product_name, stock_quantity, price FROM products WHERE item_id = ?', [ans.itemID], function(err, res){
				// Check if user entered a valid item_id
				if(err || res.length == 0) {
					console.log("Item does not exist. Check your item ID.");
				}
				else{
					// If purchase can be made
					if(ans.qty <= res[0].stock_quantity){
						// Update database quantity
						var sales = res[0].price*ans.qty;
						//duct multiplied by the quantity purchased is added to the product's product_sales column.
						connection.query('UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ? '
							+ 'WHERE item_id = ?;', [ans.qty, sales, ans.itemID],
							function(err, res){
								if(err) throw err;
							});
						// Display cost to user
						console.log("Total cost $%d for %d units of %s", sales.toFixed(2), ans.qty, res[0].product_name);
					}
					// Purchase cannot be made
					else{
						console.log("Insufficient inventory for purchase. There are only %s units available.", res[0].stock_quantity);
					}
				}
			});
		}
	});
};