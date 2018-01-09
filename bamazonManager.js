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
    if(err) throw err;
    
    console.log('BAMAZON MANAGER VIEW');
    console.log('-------------------------------------------');
    
    managerOptions();
});

//MANAGER PROMPT 
managerOptions = () => {

    inquirer.prompt({
        
        name: 'command',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Products',
            'Low Inventory',
            'Add To Inventory',
            'Add New Product',
            'Quit'
        ]
    }).then((answer) => {

        switch (answer.command) {

            case 'View Products':
                connection.query('SELECT * FROM products', (err, res) => {
                    
                    console.log('-------------------------------------------');
                    console.log('PRODUCTS AVAILABLE');
                    console.log('-------------------------------------------');

                    for (let i = 0; i < res.length; i++) {

                        console.log(res[i].id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + res[i].price + ' | ' + res[i].stock_quantity);
                    }

                    console.log('-------------------------------------------');

                    managerOptions();
                });
                break;

            case 'Low Inventory':
                
                connection.query('SELECT * FROM products', (err, res) => {

                    console.log('-------------------------------------------');
                    console.log('LOW QUANTITY INVENTORY')
                    console.log('-------------------------------------------');

                    for (let i = 0; i < res.length; i++) {

                        if (res[i].stock_quantity < 10) {

                            console.log(res[i].id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + res[i].price + ' | ' + res[i].stock_quantity);
                        }
                    }

                    console.log('-------------------------------------------');

                    managerOptions();
                });
                break;

            case 'Add To Inventory':
                
                console.log('-------------------------------------------');
                console.log('ADD INVENTORY');
                console.log('-------------------------------------------');

                connection.query('SELECT * FROM products', (err, res) => {
                    
                    console.log('PRODUCTS AVAILABLE');
                    console.log('-------------------------------------------');

                    for (let i = 0; i < res.length; i++) {

                        console.log(res[i].id + ' | ' + res[i].product_name + ' | ' + res[i].department_name + ' | ' + res[i].price + ' | ' + res[i].stock_quantity);
                    }

                    console.log('-------------------------------------------');

                    inquirer.prompt([
                        {
                            name: 'product',
                            type: 'input',
                            message: 'What product would you like to add inventory to? [Use ID]'
                         },
                         {
                             name: 'add',
                             type: 'input',
                             message: 'How much would you like to add to the inventory?'
                         }
                    ]).then((answer) => {

                        let product = answer.product;
                        let amount = parseInt(answer.add);

                        console.log('-------------------------------------------');
                        console.log(amount + ' ADDED TO PRODUCT ID ' + product);
                        console.log('-------------------------------------------');

                        connection.query('SELECT * FROM products WHERE ?', {id: product}, (err, data) => {

                            if (err) throw err;

                            connection.query('UPDATE products SET stock_quantity= ' + (data[0].stock_quantity + amount) + ' WHERE id= ' + product);

                            managerOptions();
                        });
                    });
                });
                break;
            
            case 'Add New Product':
                
                console.log('-------------------------------------------');
                console.log('ADD NEW PRODUCT');
                console.log('-------------------------------------------');

                connection.query('SELECT * FROM products', (err, res) => {

                    inquirer.prompt([
                        {
                            name: 'name',
                            type: 'input',
                            message: 'What is the product?'
                        },
                        {
                            name: 'department',
                            type: 'input',
                            message: 'What department does it belong to? (ex. electronics, beauty, kitchen)'
                        },
                        {
                            name: 'price',
                            type: 'input',
                            message: 'What price would you like to set it to?'
                        },
                        {
                            name: 'stock',
                            type: 'input',
                            message: 'What is the stock amount?'
                        }
                    ]).then((answer) => {

                        connection.query('INSERT INTO products SET ?',
                            {
                                product_name: answer.name,
                                department_name: answer.department,
                                price: answer.price,
                                stock_quantity: answer.stock
                            }, 
                            (err, res) => {

                                if (err) throw err;

                                console.log('-------------------------------------------');
                                console.log(res.affectedRows + ' PRODUCT ADDED TO INVENTORY');
                                console.log('-------------------------------------------');

                                managerOptions();
                            });
                    });
                });
                break;

            case 'Quit':
                
                connection.end();
                break;
        }

    });
}