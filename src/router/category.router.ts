import express from 'express'
import { faker } from '@faker-js/faker';

const router = express.Router();

router.get('/', (req, res) => {
  const category = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    category.push({
      name: faker.commerce.productAdjective(),
      price: faker.commerce.price(),
      image: faker.image.imageUrl()
    })
  }
  res.json(category);
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'Producto 1', price: 3000 });
})

export default router
