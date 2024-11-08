import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './api/routes/auth';
import productRoutes from './api/routes/product';
import categoryRoutes from './api/routes/category';
import sizeRoutes from './api/routes/size';
import newsRoutes from './api/routes/news';
import requestFormRoutes from './api/routes/requestForm';
import { specs, swaggerUi } from '../src/config/swagger';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/sizes', sizeRoutes);
app.use('/news', newsRoutes);
app.use('/requestForm', requestFormRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
