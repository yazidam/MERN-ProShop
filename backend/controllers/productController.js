const express = require("express");
const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "product not found" });
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id); //raq.user._id aya user bech yod5el
  if (product) {
    await product.remove();
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product dont found");
  }
};

module.exports = {
  getProductById,
  getProducts,
  deleteProduct,
};
