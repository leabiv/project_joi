import express from 'express'
import { faker } from '@faker-js/faker';

const router = express.Router();

router.get('/', (req, res) => {
  const category = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    category.push({
      cityName: faker.address.cityName(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()
    })
  }
  res.json(category);
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, cityName: faker.address.cityName(), latitude: faker.address.latitude() });
})

export default router
