const express = require('express');
const route = express.Router();

const controller = require('../Controllers/add');


//Below code is similar to app.get(), app.use() and app.post()....(:
route.get('/add-product', controller.admin);

route.get('/products', controller.product);

route.post('/add-product', controller.addProduct);

route.get('/edit-product/:productId', controller.getEditProduct);

route.post('/edit-product', controller.postEditCart);

route.post('/delete-product', controller.delete);

module.exports = route;     