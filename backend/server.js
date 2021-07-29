const express = require("express");
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const app = express();
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`serveur runnig in port ${PORT}`));
