// index.js
const express = require('express');
const app = express();
const productRoutes = require('../backend/routes/products.route'); 


// Middleware to parse JSON bodies
app.use(express.json());

// Use the router for handling routes starting with '/api'
app.use('/api', productRoutes);

// Start the server
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
