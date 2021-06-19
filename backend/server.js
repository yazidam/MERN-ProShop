const express = require('express');

const app = express();
const dotenv = require('dotenv');
const productRoute = require('./routes/productRoute');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

app.use('/api/products', productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`serveur runnig in port ${PORT}`));
