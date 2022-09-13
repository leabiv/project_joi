import express from 'express'
import { UserService } from '../services/user.service';
import { createUserSchema, updateUserSchema, getUserSchema } from '../schemas/user.schema'

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res) => {
  const user = await service.find();
  res.json(user);
})

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const user = service.findOne(Number(id));
    res.json(user);
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }

})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(Number(id), body);
    res.json(user);
  } catch (error) {
    next(error)
  }

})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.delete(Number(id))
    res.json(user)
  } catch (error) {
    next(error)
  }

})
export default router
