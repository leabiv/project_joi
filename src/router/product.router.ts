import express from 'express'
import { ProductsServices } from '../services/product.service'
import { validatorHandler } from '../middlewares/validator.handler'
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.schema'

const router = express.Router();
const service = new ProductsServices();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//Metodo get mostrar Producto
router.get('/:id',
  //validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error)
    }
  });

//Metodo post Guardar Producto
router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct)
});

//Metodo Patch actualizar Producto
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body)
    res.json(product)
  } catch (error) {
    next(error)
  }
});

//Metodo delete eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id)
  res.json(product)
});

export default router
