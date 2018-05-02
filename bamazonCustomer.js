var inquirer = require('inquirer');
var mysql = require('mysql');
/***********
 * connecting to server
 ***************/
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',
    password: 'root',
    database: 'bamazon'
});

function connect() {
    connection.query('SELECT * FROM products', function (err, res) {
        for (var i = 0; i < res.length; i++) {
            /****************
             * Grabbing info from the database
             ***************/
            if (err) throw err;
            console.log('----------------');
            console.log('Product ID: ' + res[i].id + ' Product Name: ' + res[i].product_name + ' Department: ' + res[i].department_name + ' Price: ' + res[i].price + ' quantity: ' + res[i].stock_quantity);
            console.log('----------------');

            /***********
             * Using inquirer for our CLI
             ***************/
            inquirer.prompt([
                {
                    name: 'purchase',
                    type: 'input',
                    message: 'input the ID of the item you want to buy'
                }, {
                    name: 'quantity',
                    type: 'input',
                    message: 'how much would you like to purchase?'
                }
            ]).then(function (input) {
                
                /***********
                 * setting variables for the user choices
                 ***************/
                var buying = input.purchase;
                var qnty = input.quantity;

                console.log("you're trying to purchase ID # " + buying);
                console.log("quantity: " + qnty);
                console.log('checking our inventory...');

                /**************
                 * Using IF ELSE to check our database stock quantity with the amount that user wants to purchase
                 ***************/
                if (res[buying].stock_quantity > qnty) {
                    connection.query(

                        /**************
                        * If successful, then the databse subtracts the total amount purchased from the database
                        ***************/
                        'UPDATE products SET ? WHERE ?',
                        [
                            { stock_quantity: (res(buying).stock_quantity - qnty) }
                        ], (err, res) => {
                            if (err) throw error;
                            console.log('congrats on your purchase!!')
                        }
                    )
                } else {
                    console.log('Sorry! Not enough inventory...');
                };
            }
            )

        }
    }
    )
}
connect();