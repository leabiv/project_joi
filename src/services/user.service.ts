import boom from "@hapi/boom";
import { User } from "../modules/user.models";

export class UserService {

  private users: User[] = []

  constructor() { }

  async create(data: User) {
    const newUser = {
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    return this.users;
  }

  async findOne(id: number) {
    const user = this.users.find(item => item.id === id)
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async update(id: number, changes: User) {
    const buscarIndex = this.users.findIndex(item => item.id === id);
    if (buscarIndex === -1) {
      throw boom.notFound('User not found')
    }
    const user = this.users[buscarIndex];
    this.users[buscarIndex] = {
      ...user,
      ...changes
    }
    return this.users[buscarIndex]
  }

  async delete(id: number) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found')
    }
    this.users.splice(index, 1);
    return { id }
  }

}
