const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoutes = require('./routes/auth');
//const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');

const app = express();

app.use(express.json());
app.use(userRoutes);
//app.use(orderRoutes);
app.use(productRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(7000);
    console.log("Connected to MongoDB!!!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });