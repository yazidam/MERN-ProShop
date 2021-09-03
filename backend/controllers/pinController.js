const Pin = require("../models/pinModel");

const addPinToMpa = async (req, res) => {
  const newPin = new Pin({
    usename: req.body.username,
    title: req.body.title,
    desc: req.body.desc,
    rating: req.body.rating,
    lat: req.body.lat,
    long: req.body.long,
    user: req.user._id,
  });
  const addPinToMpa = await newPin.save();
  res.status(201).json(addPinToMpa);
};

const getAllPins = async (req, res) => {
  const pins = await Pin.find();
  res.json(pins);
};

module.exports = {
  addPinToMpa,
  getAllPins,
};
