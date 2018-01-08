# bamazon

### Overview
Bamazon is a command line interface faux-storefront that allows users to purchase various products in various quantity which dynamically changes the on-hand stock quantity in realtime.

### Use

#### Storefront
This is the storefront you will be greeted with.
```
WELCOME TO BAMAZON!
-------------------------------------------
1 | camera | electronics | $499.99 | 5
2 | settlers of catan | toys | $59.98 | 10
3 | shampoo | beauty | $8.99 | 25
4 | switch | electronics | $299.99 | 3
5 | spoon | kitchen | $0.98 | 100
6 | grinder | kitchen | $79.97 | 8
7 | hair dye | beauty | $15.98 | 30
8 | laptop | electronics | $999.99 | 1
9 | funko pop | toys | $9.99 | 150
10 | the matrix | electronics | $9.99 | 700
-------------------------------------------
```

The table represents the products currently in stock. Each product is broken down into its respective id (the number on the left-hand side next to it), name, department, price, and current on-hand stock.

### Making Purchases
The user will be presented with two requests that will guide them through the ordering process.

##### First Request:
```
? Which product would you like to purchase? [Use product ID]
```
The user should use the product's ID located next to the product name on the left-hand side in the table that's provided at the start-up of this application. This should be a number and the user should only purchase one product at this stage.

Once the user has selected their desired product, and hit enter, this will prompt the next step.

##### Second Request: 
```
? How many would you like to purchase?
```
The user should choose the appropriate quantity they would like to purchase and hit enter.
