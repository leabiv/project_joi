import boom from "@hapi/boom";
import { Categoryes } from "../modules/category.models";

export class CategoryService {

  private categorys: Categoryes[] = []

  constructor() {
  }
  async create(data: Categoryes) {
    const newCategory = {
      ...data
    }
    this.categorys.push(newCategory);
    return newCategory;
  }

  async find() {
    return this.categorys;
  }

  async findOne(id: number) {
    const buscarCateg = this.categorys.find(item => item.id === id)
    if (!buscarCateg) {
      throw boom.notFound('Category not found')
    }
    return buscarCateg
  }

  async update(id: number, changes: Categoryes) {
    const buscarIndex = this.categorys.findIndex(item => item.id === id);
    if (buscarIndex === -1) {
      throw boom.notFound('Category not found')
    }
    const categori = this.categorys[buscarIndex];
    this.categorys[buscarIndex] = {
      ...categori,
      ...changes
    }
    return this.categorys[buscarIndex]
  }

  async delete(id: number) {
    const index = this.categorys.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found')
    }
    this.categorys.splice(index, 1);
    return { id }
  }

}
