import express from 'express'
import { CategoryService } from '../services/category.service'
import { createCategorySchema, updateCategorySchema, getCategorySchema } from '../schemas/category.schema'

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res) => {
  const category = await service.find();
  res.json(category)
});

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const category = service.findOne(Number(id));
    res.json(category);
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(Number(id), body)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.delete(Number(id))
    res.json(category)
  } catch (error) {
    next(error)
  }
})

export default router
