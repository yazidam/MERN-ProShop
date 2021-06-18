const express = require('express');
const productus = require('./data/products');
const app = express();

app.get('/api/products', (req, res) => {
  res.json(productus);
});

app.get('/api/products/:id', (req, res) => {
  const product = productus.find((p) => p._id == req.params.id);
  res.json(product);
});
app.listen(5000, console.log('serveur runnig in port 5000'));
