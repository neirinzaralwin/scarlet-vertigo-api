import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './api/routes/auth';
import productRoutes from './api/routes/product';
import categoryRoutes from './api/routes/category';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    app.listen(7000, () => {
      console.log('Server is running on port 7000');
      console.log('Connected to MongoDB!!!');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
