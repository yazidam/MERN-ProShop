const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
var nodemailer = require("nodemailer");
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
      console.log("loginnn");
    } else {
      res.status(401);
      throw new Error("invalid email or password");
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
    throw new Error("user dont found");
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
    console.log("exxxxxxxxxxx");

    throw new Error("User alredy Exist");
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
    throw new Error("invalid user data");
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id); //raq.user._id aya user bech yod5el
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // const hashedPsw = await bcrypt.hash(password, 10);

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user dont found");
  }
};

// router.post('/reset-password'
const reset_password = async (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    //crypto create token
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(203).send("user dont exists with that email");
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            // type: "OAuth2",
            user: "wecodeesprit@gmail.com",
            // clientId: CLIENT_ID,
            // clientSecret: CLIENT_SECRET,
            // refreshToken: REFRESH_TOKEN,
            // accessToken: accessToken,
            pass: "wecode1234",
          },
        });

        transporter.sendMail({
          to: user.email,
          from: "wecodeesprit@gmail.com",
          subject: "Password reset",
          html: `<p>You requested for password reset</p>
          <h5> clik this link <a href="https://localhost:3000/rest/${token}">link</a> to reset your password</h5>`,
        });
        res.send("check your email");
      });
    });
  });
};

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  reset_password,
};
