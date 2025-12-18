const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();

//   const { products, people } = require("./data");
const { products } = require("./data");
const peopleRouter = require("./routes/people");

/* -------------------- LOGGER MIDDLEWARE -------------------- */
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
};

/* -------------------- MIDDLEWARE ORDER MATTERS -------------------- */
app.use(logger); // runs for ALL paths

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'public' directory ( Middleware )
app.use(express.static('./methods-public'));

/*   // Parse JSON bodies ( Middleware )
app.use(express.json());   */

/*   // Sample data
const { products } = require("./data");   */

/* -------------------- AUTHENTICATION MIDDLEWARE -------------------- */
const auth = (req, res, next) => {
  if (req.cookies && req.cookies.name) {
    req.user = req.cookies.name;
    next();
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
};

// All routes
/* -------------------- ROUTES -------------------- */
// People routes
app.use("/api/v1/people", peopleRouter);

/* -------------------- AUTH (COOKIE) ROUTES -------------------- */
// Log on (set cookie)
app.post("/logon", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Please provide a name" });
  }

  res
    .status(201)
    .cookie("name", name, { httpOnly: true })
    .json({ message: `Hello ${name}` });
});

// Log off (clear cookie)
app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ message: "You are logged off" });
});

// Protected test route
app.get("/test", auth, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user}`,
  });
});

/*   // Define a test route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});   */

/* -------------------- PRODUCT ROUTES -------------------- */
// Return all products
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// Get product by ID
app.get("/api/v1/products/:productID", (req, res) => {
  //   const idToFind = parseInt(req.params.productID);
  const idToFind = Number(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

/* -------------------- QUERY ROUTES -------------------- */
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

/* -------------------- 404 ROUTE -------------------- */
// Handle all other routes (404 Not Found)
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

/* -------------------- START SERVER -------------------- */
// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});

console.log('Express Tutorial')
