const express = require("express");
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const app = express();
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const connectDB = require("./config/db");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

dotenv.config();
connectDB();
app.use(express.json());
app.use(cookieParser());

mongoose.set("useFindAndModify", false);
const store = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "mySession",
});

app.use(
  session({
    secret: "key to sign in",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
      httpOnly: false,
    },
    store: store,
  })
);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`serveur runnig in port ${PORT}`));
