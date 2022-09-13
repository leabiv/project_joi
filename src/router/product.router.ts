import express from 'express'
import { ProductsServices } from '../services/product.service'
import { validatorHandler, validatorHandlerParams, validatorHandlerBody } from '../middlewares/validator.handler'
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.schema'

const router = express.Router();
const service = new ProductsServices();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//Metodo get mostrar Producto
router.get('/:id',
  validatorHandlerParams(getProductSchema, 'params'),
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
router.post('/',
  validatorHandlerBody(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  });

//Metodo Patch actualizar Producto
router.patch('/:id',
  validatorHandlerParams(getProductSchema, 'params'),
  validatorHandlerBody(updateProductSchema, 'body'),
  async (req, res, next) => {
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
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
});

export default router
