const express = require('express');
const productus = require('./data/products');
const app = express();
const dotenv = require('dotenv');

const connectDB = require('./config/db');

dotenv.config();
connectDB();

app.get('/api/products', (req, res) => {
  res.json(productus);
});

app.get('/api/products/:id', (req, res) => {
  const product = productus.find((p) => p._id == req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`serveur runnig in port ${PORT}`));
