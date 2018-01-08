DROP DATABASE IF EXISTS bamazonDB

CREATE DATABASE bamazonDB

USE bamazonDB

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('camera', 'electronics', 499.99, 5)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('settlers of catan', 'toys', 59.98, 10)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('shampoo', 'beauty', 8.99, 25)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('switch', 'electronics', 299.99, 3)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('spoon', 'kitchen', 0.98, 100)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('grinder', 'kitchen', 79.97, 8)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('hair dye', 'beauty', 15.98, 30)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('laptop', 'electronics', 999.99, 1)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('funko pop', 'toys', 9.99, 150)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('the matrix', 'electronics', 9.99, 700)