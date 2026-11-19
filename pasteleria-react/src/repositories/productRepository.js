import { apiRequest } from '../services/api'

async function getAll() {
  return await apiRequest('/productos')
}

async function getById(id) {
  return await apiRequest(`/productos/${id}`)
}

async function create(product) {
  return await apiRequest('/productos', {
    method: 'POST',
    body: JSON.stringify(product),
  })
}

async function update(id, updatedProduct) {
  return await apiRequest(`/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedProduct),
  })
}

async function remove(id) {
  await apiRequest(`/productos/${id}`, {
    method: 'DELETE',
  })

  return true
}

export const productRepository = {
  getAll,
  getById,
  create,
  update,
  remove,
}