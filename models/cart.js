const path = require('path');

const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json');

module.exports = class Cart {
    static addProduct(id, price) {

        fs.readFile(p, (err, data) => {
            let cart = {
                products: [],
                Tprice: 0
            };

            if (!err) {
                cart = JSON.parse(data);
            }
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.Tprice = +price + cart.Tprice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(p, (err, data) => {
            if (!err) { //If I try to read cart and there is an error, this means that there is nothing to delete from cart

                let newCart = { ...JSON.parse(data) };
                const product = newCart.products.find(prod => prod.id === id);
                const qty = product.qty;

                newCart.products = newCart.products.filter(
                    prod => prod.id !== id
                );

                newCart.Tprice = newCart.Tprice - price * qty;
                fs.writeFile(p, JSON.stringify(newCart), err => {
                    console.log(err);
                });
            }

        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, data) => {
            const cart = JSON.parse(data);
            if (err) {
                cb(null)
            }
            else {
                cb(cart);
            }
        })
    }
};