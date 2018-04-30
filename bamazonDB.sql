CREATE DATABASE bamazon;

USE bamazon;

create TABLE products (
id INT(100) AUTO_INCREMENT NULL,
PRIMARY KEY(id),
product_name VARCHAR(1000) NULL,
department_name VARCHAR(100) NULL,
price INT(255) NULL,
stock_quantity INT(255) NULL
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Apples', 'Foods', .99, 150),
		("PC", "Electronics", 120, 10),
        ("Black Shirts", "Clothes", 10, 20),
        ("Cold Medicine", "Pharmacy", 20, 50),
        ("BaseBall Bats", "Sporting", 100, 10),
        ('Bananas', 'Foods', 2, 200),
		("MAC", "Electronics", 250, 5),
        ("Blue Jeans", "Clothes", 20, 30),
        ("Fever Medicine", "Pharmacy", 20, 50),
        ("BaseBall Gloves", "Sporting", 60, 10);