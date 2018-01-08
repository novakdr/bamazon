//DEPENDENCIES
const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,

    user: 'root',

    password: 'root',
    database: 'bamazonDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('WELCOME TO BAMAZON!');
    console.log('-------------------------------------------');

    showTable();
});


//SHOWS INITIAL TABLE OF AVAILABLE PRODUCTS
showTable = () => {

    connection.query('SELECT * FROM products', (err, res) => {
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | $' + res[i].price + ' | ' + res[i].stock_quantity);
        }
        
        console.log('-------------------------------------------');
        
        userPrompt();
    });
}


//CUSTOMER PROMPTS
userPrompt = () => {

    inquirer.prompt([
        {
            name: 'product_id',
            type: 'input',
            message: 'Which product would you like to purchase? [Use product ID]'
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'How many would you like to purchase?'
        }
    ]).then((answer) => {

        let product = answer.product_id;
        let quantity = answer.quantity;

        connection.query('SELECT * FROM products WHERE ?', {id: product}, (err, data) => {

            if (err) throw (err);

            if (quantity <= data[0].stock_quantity) {
                
                console.log('Item[s] purchased!');
                console.log('Your total is: $' + (quantity * data[0].price));
                console.log('-------------------------------------------');

                connection.query('UPDATE products SET stock_quantity= ' + (data[0].stock_quantity - quantity) + ' WHERE id= ' + product);

                showTable();

            } else {
                console.log('Insufficient quantity!');

                userPrompt();
            }
        });
    });
}



