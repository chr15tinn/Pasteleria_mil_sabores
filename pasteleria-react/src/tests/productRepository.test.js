import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'

import {
  apiRequest
} from '../services/api'

import {
  productRepository
} from '../repositories/productRepository'


vi.mock(
  '../services/api',
  () => ({
    apiRequest: vi.fn()
  })
)


describe(
  'productRepository',
  () => {

    beforeEach(() => {

      vi.clearAllMocks()
    })


    it(
      'obtiene la lista de productos',
      async () => {

        const productosBackend = [
          {
            id: 1,
            nombre:
              'Torta Cuadrada de Chocolate',
            precio: 45000,
            stock: 10
          },
          {
            id: 2,
            nombre:
              'Torta Cuadrada de Frutas',
            precio: 50000,
            stock: 8
          }
        ]


        apiRequest.mockResolvedValue(
          productosBackend
        )


        const products =
          await productRepository
            .getAll()


        expect(
          Array.isArray(products)
        ).toBe(true)


        expect(
          products
        ).toHaveLength(2)


        expect(
          apiRequest
        ).toHaveBeenCalledWith(
          '/productos'
        )
      }
    )


    it(
      'crea un nuevo producto',
      async () => {

        const nuevoProducto = {

          nombre:
            'Torta de Prueba',

          descripcion:
            'Producto creado para pruebas',

          precio:
            10000,

          stock:
            10,

          imagen:
            '',

          oferta:
            false,

          categoria: {
            id: 1
          }
        }


        const productoGuardado = {
          id: 20,
          ...nuevoProducto
        }


        apiRequest.mockResolvedValue(
          productoGuardado
        )


        const resultado =
          await productRepository
            .create(
              nuevoProducto
            )


        expect(
          resultado.nombre
        ).toBe(
          'Torta de Prueba'
        )


        expect(
          resultado.id
        ).toBe(20)


        expect(
          apiRequest
        ).toHaveBeenCalledWith(
          '/productos',
          {
            method: 'POST',

            body:
              JSON.stringify(
                nuevoProducto
              )
          }
        )
      }
    )


    it(
      'actualiza un producto existente',
      async () => {

        const productoActualizado = {

          id: 1,

          nombre:
            'Producto Modificado',

          descripcion:
            'Prueba',

          precio:
            15000,

          stock:
            10,

          imagen:
            '',

          oferta:
            false,

          categoria: {
            id: 1
          }
        }


        apiRequest.mockResolvedValue(
          productoActualizado
        )


        const resultado =
          await productRepository
            .update(
              1,
              productoActualizado
            )


        expect(
          resultado.nombre
        ).toBe(
          'Producto Modificado'
        )


        expect(
          resultado.precio
        ).toBe(15000)


        expect(
          apiRequest
        ).toHaveBeenCalledWith(
          '/productos/1',
          {
            method: 'PUT',

            body:
              JSON.stringify(
                productoActualizado
              )
          }
        )
      }
    )


    it(
      'elimina un producto',
      async () => {

        apiRequest.mockResolvedValue(
          null
        )


        const resultado =
          await productRepository
            .remove(1)


        expect(
          resultado
        ).toBe(true)


        expect(
          apiRequest
        ).toHaveBeenCalledWith(
          '/productos/1',
          {
            method: 'DELETE'
          }
        )
      }
    )

  }
)