const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    //si user login and role nt3o isAdmin w9tha yt3ada
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
};
module.exports = admin;
