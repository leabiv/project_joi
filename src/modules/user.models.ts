import { EmailOptions } from "joi"

export interface User{
  id: number,
  firstname: string,
  lastname: string,
  years: string,
  image: string,
  email: string,
  password: string,
  role: string,
  isBlock: boolean
}
