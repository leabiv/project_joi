import { Product } from "../router/product.model";
import { faker } from '@faker-js/faker';
import  boom  from "@hapi/boom";

export class ProductsServices {
  private products: Product[] = [];

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data: Product) {
    const newProduct = {
      idd: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find() {
    return this.products;
  }

  async findOne(id: string) {
    const product = this.products.find(item => item.id === id)
    if(!product){
      throw boom.notFound('product not found')
    }
    if(product.isBlock){
      throw boom.conflict('product is block')
    }
    return product;
  }

  async update(id: string, changes: Product) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      //throw new Error('Producto no encontrado')
      throw boom.notFound('product not found')
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id: string) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      //throw new Error('Producto no encontrado')
      throw boom.notFound('product not found')
    }
    this.products.splice(index, 1);
    return { id }
  }
}
