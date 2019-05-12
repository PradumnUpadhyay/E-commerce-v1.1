// const path = require('path');

const express = require('express'),
user = express.Router(),
controller = require('../Controllers/user_C');

user.get('/', controller.show);

user.get('/product-list', controller.product);

user.get('/products/:productId', controller.productId);

//GET- Cart
user.get('/cart', controller.cart);

//POST- Cart
user.post('/cart', controller.postcart);

user.post('/cart-delete-item', controller.deleteCartItem);

user.get('/orders', controller.orders);

user.get('/checkout', controller.checkout);


module.exports = user;

