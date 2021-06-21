const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
//email and password authtification part & get token

const authUser = async (req, res) => {
  //to acess data eli jeya mel front req.body
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(203).send("vous n'etes pas enregistrer");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(203).send('mot de passe incorrecte');
  }
  if (user && isMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
};

//get user profil
// GET /api/users/profile
// access Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id); //raq.user._id aya user bech yod5el
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('user dont found');
  }
};
module.exports = {
  authUser,
  getUserProfile,
};
