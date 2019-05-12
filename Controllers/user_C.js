const Product = require('../models/Products');
const Cart = require('../models/cart');

//show 
exports.show = (req, res, next) => {

  Product.retrieve(products => { //#callback function to resolve the "length undefined" err

    res.render('../views/Shop/index', {
      product: products,
      path: '/',
      title: 'Shop',
    });

  });
};

//Products
exports.product = (req, res, next) => {
  Product.retrieve(products => { //#callback function to resolve the "length undefined" err

    res.render('../views/Shop/product-list', {
      product: products,
      path: '/product-list',
      title: 'Shop',

    });
  })
}
//Product ID
exports.productId = (req, res, next) => {
  const _id = req.params.productId;
  Product.prodById(_id, prods => {

    res.render('shop/details', {

      product: prods,
      title: prods.title,
      path: '/products'
    });
  })

}
//GET- cart
//Check this code again
exports.cart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.retrieve(prods => {
      const cartProd = [];
      for (product of prods) {
        const info = cart.products.find(p => p.id === product.id);
        if (info) {
          cartProd.push({ productinfo: product, qty: info.qty });

        }
      }
      res.render('../views/Shop/cart', {
        path: '/cart',
        title: 'Your Cart',
        products: cartProd
      });
    })
  })
}

//POST- cart
exports.postcart = (req, res, next) => {
  const _id = req.body.id;
  console.log(_id);
  Product.prodById(_id, prod => {
    //  console.log(prod);
    Cart.addProduct(_id, prod.price);
  });
  res.redirect('/cart');
}

//POST - Delete Cart Items
exports.deleteCartItem = (req, res, next) => {
  const _id = req.body.productId;

  Product.prodById(_id, product =>{
  Cart.deleteProduct(_id, product.price); 
  });
  res.redirect('/cart');
}


exports.orders = (req, res, next) => {
  res.render('../views/Shop/orders', {
    path: '/orders',
    title: 'Your Orders',
  });
}

exports.checkout = (req, res, next) => {
  res.render('../views/Shop/checkout', {
    path: '/checkout',
    title: 'Checkout Page'
  });
}