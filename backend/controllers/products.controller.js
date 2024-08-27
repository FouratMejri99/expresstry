const Products = require('../models/products.models');

const AddProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);

    if (req.file) {
      product.image = req.file.path;
      await product.save();
    }

    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error adding product' });
  }
};

const FindAllProducts = async (req, res) => {
  try {
    // Extract filters from the request query
    const { category, filter1, filter2 } = req.query;

    // Build the filter object based on the received filters
    const filterObject = {
      ...(category && { category }), // Add category filter if present
      ...(filter1 && { filter1 }),     // Add filter1 if present
      ...(filter2 && { filter2 }),     // Add filter2 if present
      // Add more filters as needed
    };

    const data = await Products.find(filterObject);
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

const FindSingleProduct = async (req, res) => {
  try {
    const data = await Products.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const data = await Products.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error updating product' });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    await Products.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

const FindTopProducts = async (req, res) => {
  try {
    console.log('Fetching top products...');
    const topProducts = await Products.find().limit(10);
    console.log('Top products fetched:', topProducts);
    res.json(topProducts);
  } catch (err) {
    console.error('Error fetching top products:', err);
    res.status(500).json({ message: err.message });
  }
};

const FindCategories = async (req, res) => {
  try {
    const categories = await Products.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const FindProductsByCategory = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const query = category ? { category } : {};

  try {
    const products = await Products.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    
    const totalProducts = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({ products, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  AddProduct,
  FindAllProducts,
  FindSingleProduct,
  UpdateProduct,
  DeleteProduct,
  FindTopProducts,
  FindCategories,
  FindProductsByCategory
};
