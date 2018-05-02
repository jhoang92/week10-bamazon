var inquirer = require('inquirer');
var mysql = require('mysql');

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

            if (err) throw err;
            console.log('----------------');
            console.log('Product ID: ' + res[i].id + ' Product Name: ' + res[i].product_name + ' Department: ' + res[i].department_name + ' Price: ' + res[i].price + ' quantity: ' + res[i].stock_quantity);
            console.log('----------------');
            // options();

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
                var buying = input.purchase;
                var qnty = input.quantity;

                console.log("you're trying to purchase ID # " + buying);
                console.log("quantity: " + qnty);
                console.log('checking our inventory...');

                if (res[buying].stock_quantity > qnty) {
                    connection.query(
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