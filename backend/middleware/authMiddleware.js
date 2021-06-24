const jwt = require('jsonwebtoken'); /// midellware to validate token
const UserModel = require('../models/userModel');
const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id).select('-password'); //fetch user
      next();
    } catch (error) {
      // console.err(error);
      res.status(401);
      throw new Error('Not authorized no token');
    }
  }
  if (!token) {
    res.status(401);
    // console.log('errr');
    // throw new Error('Not authorized no token');
  }
};

module.exports = protect;
