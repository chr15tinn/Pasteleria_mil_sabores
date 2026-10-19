import { products } from '../data/products'

const STORAGE_KEY = 'products'

function initializeProducts() {
  const storedProducts = localStorage.getItem(STORAGE_KEY)

  if (!storedProducts) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products)
    )
  }
}

function getAll() {
  initializeProducts()

  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  ) || []
}

function getById(id) {
  const allProducts = getAll()

  return allProducts.find(
    product => product.id === id
  )
}

function create(product) {
  const allProducts = getAll()

  allProducts.push(product)

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(allProducts)
  )

  return product
}

function update(id, updatedProduct) {
  const allProducts = getAll()

  const updatedProducts = allProducts.map(
    product =>
      product.id === id
        ? { ...product, ...updatedProduct }
        : product
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedProducts)
  )

  return getById(id)
}

function remove(id) {
  const allProducts = getAll()

  const updatedProducts =
    allProducts.filter(
      product => product.id !== id
    )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedProducts)
  )

  return true
}

export const productRepository = {
  getAll,
  getById,
  create,
  update,
  remove
}