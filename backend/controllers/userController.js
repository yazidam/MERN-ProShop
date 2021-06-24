const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
//email and password authtification part & get token

const authUser = async (req, res) => {
  //to acess data eli jeya mel front req.body
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    // if (!user) {
    //   return res.status(203).send("vous n'etes pas enregistrer");
    // }
    const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(203).send('mot de passe incorrecte');
    // }

    if (user && isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      console.log('loginnn');
    } else {
      res.status(401);
      throw new Error('invalid email or password');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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

const registerUser = async (req, res) => {
  //to acess data eli jeya mel front req.body
  // const { name, email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    console.log('exxxxxxxxxxx');

    throw new Error('User alredy Exist');
  }
  const hashedPsw = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPsw,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
};

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
};
