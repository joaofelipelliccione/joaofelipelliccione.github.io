import express from 'express';

import errorMw from './middlewares/errorMw';

import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/login', loginRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use(errorMw);

export default app;
