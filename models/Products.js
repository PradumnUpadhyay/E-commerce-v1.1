const Cart = require('./cart')
const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(
    process.mainModule.filename),
    'data',
    'product.json');

const getProducts = (cb) => {

    fs.readFile(p, (err, data) => {
        if (err) {
            return cb([]);
        }

        cb(JSON.parse(data));
    });
}

module.exports = class Product {

    constructor(id, title, imageURL, price, description) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.price = price;
        this.description = description;

    }

    save() {
        getProducts(products => {
            console.log(this.id + "\n" + Product.id);
            if (this.id) { //Condition to check if we have an existing ID

                const existingProductIndex = products.findIndex(
                    prod => this.id === prod.id
                );
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;

                //Writing to file the changed Value
                fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                    console.log(err);
                });
            }
            // otherwise creating assgning a new ID to the product
            else {
                // console.log("inside else block");
                this.id = Math.random().toString();
                getProducts(products => {
                    products.push(this);

                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        console.log(err);
                    });
                });
            }
        });

    }

    static delete(id) {
        getProducts(products => {
            const product = products.find(prod => prod.id === id);
            const deleteProduct = products.filter(prod => prod.id !== id);
            console.log(deleteProduct);
            fs.writeFile(p, JSON.stringify(deleteProduct), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                } else {
                    console.log(err);
                }
            });
        });
    }

    static retrieve(cb) {//#creating callback function to resolve the "length undefined" err
        getProducts(cb);
    }

    static prodById(id, cb) {
        getProducts(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};