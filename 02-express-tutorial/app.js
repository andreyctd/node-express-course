const express = require('express');
const app = express();

// Serve static files from the 'public' directory ( Middleware )
app.use(express.static('./public'));

/*   // Parse JSON bodies ( Middleware )
app.use(express.json());   */

// Sample data
const { products } = require("./data");

// All routes

// Define a test route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// Return all products
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// Get product by ID
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

// Query search
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;

  let sortedProducts = [...products];

  // Filter on starting letters
  if (search) {
    sortedProducts = sortedProducts.filter((p) =>
      p.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // Limit number returned
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  // If nothing found
  if (sortedProducts.length < 1) {
    return res.status(200).json({ message: "No matching products." });
  }

  res.json(sortedProducts);
});

// Optional: return products under a price
app.get("/api/v1/under-price", (req, res) => {
  const { max } = req.query;
  if (!max) return res.json(products);

  const filtered = products.filter((p) => p.price < Number(max));
  res.json(filtered);
});

// Handle all other routes (404 Not Found)
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});

console.log('Express Tutorial')
