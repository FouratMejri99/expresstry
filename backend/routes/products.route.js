const express = require('express');
const {
  AddProduct,
  FindAllProducts,
  FindSingleProduct,
  UpdateProduct,
  DeleteProduct,
  FindTopProducts, // New function
  FindCategories,  // New function
  FindProductsByCategory // New function
} = require('../controllers/products.controller');

const router = express.Router();

// add product
router.post('/products', AddProduct);

// find all products
router.get('/products', FindAllProducts);

// find single product
router.get('/products/:id', FindSingleProduct);

// update product
router.put('/products/:id', UpdateProduct);

// delete product
router.delete('/products/:id', DeleteProduct);

// find top products
router.get('/top', FindTopProducts);

// find all categories
router.get('/categories', FindCategories);

// find products by category with pagination
router.get('/productsbycategory', FindProductsByCategory);

module.exports = router;
