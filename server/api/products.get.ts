import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(() => {
  const products = JSON.parse(readFileSync(resolve('./data/products.json'), 'utf-8'))
  return products
}) 