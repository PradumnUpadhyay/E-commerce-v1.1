const Product = require('../models/Products');

//GET- add-product
exports.admin = (req, res, next) => {
   res.render('../views/admin/edit-product',
      {
         path: '/admin/add-product',
         title: 'Add-Product',
         mode: false,
            });
};

//POST- add-product
exports.addProduct = (req, res, next) => {

   const title = req.body.title,
      imageURL = req.body.imageURL,
      price = req.body.price,
      description = req.body.description;

   const product = new Product(null, title, imageURL, price, description);
   product.save();
   //  console.log(product.title);
   res.redirect('/');
};

exports.delete = (req, res, next) =>{
   const _id = req.body.id;
   Product.delete(_id);
   res.redirect('/admin/product-list');
};

//GET- Edit Cart
exports.getEditProduct = (req, res, next) => {
   const edit = req.query.edit;
   const _id = req.params.productId;

   if (!edit) {
      return res.redirect('/');
   }

   Product.prodById(_id, prod => {
      if (!prod) {
         res.redirect('/');
      }
      res.render('../views/admin/edit-product',
         {
            path: '/admin/edit-product',
            title: 'Add-Product',
            mode: edit,
            product: prod
         });
   });

};

//POST - Edit Cart
exports.postEditCart = (req, res, next) => {
   const _id = req.body.id;
   const title = req.body.title;
   const price = req.body.price;
   const imageURL = req.body.imageURL;
   const description = req.body.description;
         
   const updatedProduct = new Product(
      _id,
      title,
      imageURL,
      price,
      description
   );

   updatedProduct.save();
   res.redirect('/admin/products');
};

exports.product = (req, res, next) => {
   Product.retrieve(products => {

      res.render('../views/admin/products', {
         product: products,
         path: '/admin/products',
         title: 'Admin Products'
      });
   })

};


