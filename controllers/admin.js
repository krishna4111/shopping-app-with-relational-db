const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  //we are going to use sequalize method
  //in here for association we are going to use req.user ->this is sequelize object
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
  })
  .then(result=>{
    console.log('created')
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
  
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
  .getProducts()
  //Product.findByPk(prodId)
  .then( products => {
    const product=products[0];
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
};



exports.postEditProduct=(req,res,next)=>{
const prodId=req.body.productId;
const prodTitle=req.body.title;
const prodImageUrl=req.body.imageUrl;
const prodDesc=req.body.description;
const prodPrice=req.body.price;

Product.findByPk(prodId)
.then(product=>{
  product.title=prodTitle,
  product.imageUrl=prodImageUrl,
  product.description=prodDesc,
  product.price=prodPrice
  return product.save()
})
.then(result =>{
  console.log('updated product')
  res.redirect('/admin/products');
})
.catch(err=>console.log(err))

}



exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log(err));
};

exports.postDeleteProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findByPk(prodId)
  .then(product=>{
     return product.destroy();
  })
  .then(results=>{
    console.log('destroy the products')
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
  
}