import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest'

import {
  productRepository
} from '../repositories/productRepository'


describe('productRepository', () => {

  beforeEach(() => {
    localStorage.clear()
  })


  it('obtiene la lista de productos', () => {

    const products =
      productRepository.getAll()

    expect(
      Array.isArray(products)
    ).toBe(true)

    expect(
      products.length
    ).toBeGreaterThan(0)

  })


  it('crea un nuevo producto', () => {

    const nuevoProducto = {
      id: 'TEST001',
      category: 'Pruebas',
      name: 'Torta de Prueba',
      price: 10000,
      description:
        'Producto creado para pruebas',
      image: '',
      stock: 10,
      offer: false
    }


    productRepository.create(
      nuevoProducto
    )


    const productoGuardado =
      productRepository.getById(
        'TEST001'
      )


    expect(
      productoGuardado
    ).toBeTruthy()


    expect(
      productoGuardado.name
    ).toBe(
      'Torta de Prueba'
    )

  })


  it('actualiza un producto existente', () => {

    const producto = {
      id: 'TEST002',
      category: 'Pruebas',
      name: 'Producto Original',
      price: 10000,
      description: 'Prueba',
      image: '',
      stock: 10,
      offer: false
    }


    productRepository.create(
      producto
    )


    productRepository.update(
      'TEST002',
      {
        ...producto,
        name:
          'Producto Modificado',
        price: 15000
      }
    )


    const productoActualizado =
      productRepository.getById(
        'TEST002'
      )


    expect(
      productoActualizado.name
    ).toBe(
      'Producto Modificado'
    )


    expect(
      productoActualizado.price
    ).toBe(15000)

  })


  it('elimina un producto', () => {

    const producto = {
      id: 'TEST003',
      category: 'Pruebas',
      name:
        'Producto a eliminar',
      price: 5000,
      description: 'Prueba',
      image: '',
      stock: 5,
      offer: false
    }


    productRepository.create(
      producto
    )


    productRepository.remove(
      'TEST003'
    )


    const productoEliminado =
      productRepository.getById(
        'TEST003'
      )


    expect(
      productoEliminado
    ).toBeUndefined()

  })

})