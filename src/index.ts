import express from 'express'
import { faker } from '@faker-js/faker';
import productRouter from './router/product.router';
import categoryRouter from './router/category.router';
import userRouter from './router/user.router'
import { logErrors, errorHandler, boomErrorHandler } from '../src/middlewares/error.handler'
import cors from 'cors';


const app = express();
const port = 4000;
app.use(express.json());
// ---------------- Metodo que permite validar la url
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin: any, callback: any) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options))
// -------------- fin ----------------------------

app.get('/', (_req, res) => {
  res.send('Hola mi sevidor');
})

app.get('/nueva', (_req, res) => {
  res.json({ id: 1, nombre: 'algo', apellido: 'otro' })
})

app.use('/api/products', productRouter);
app.use('/api/categorys', categoryRouter);
app.use('/api/users', userRouter);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mi port ${port}`)
});
