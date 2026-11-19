import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'

import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react'

import {
  productRepository
} from '../repositories/productRepository'

import {
  CartProvider,
  useCart
} from '../context/CartContext'


vi.mock(
  '../repositories/productRepository',
  () => ({
    productRepository: {
      getAll: vi.fn()
    }
  })
)


const producto = {
  id: 1,
  name: 'Torta Cuadrada de Chocolate',
  price: 45000,
  stock: 10
}

const productoBackend = {
  id: 1,
  nombre: 'Torta Cuadrada de Chocolate',
  precio: 45000,
  stock: 10
}


function TestComponent() {

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal
  } = useCart()


  return (
    <div>

      <p data-testid="cantidad-productos">
        {cart.length}
      </p>

      <p data-testid="total-items">
        {totalItems}
      </p>

      <p data-testid="subtotal">
        {subtotal}
      </p>


      <button
        onClick={() =>
          addToCart(producto)
        }
      >
        Agregar
      </button>


      <button
        onClick={() =>
          removeFromCart(
            producto.id
          )
        }
      >
        Eliminar
      </button>


      <button
        onClick={() =>
          updateQuantity(
            producto.id,
            3
          )
        }
      >
        Cambiar cantidad
      </button>


      <button
        onClick={clearCart}
      >
        Vaciar carrito
      </button>

    </div>
  )
}


async function renderCart() {

  productRepository
    .getAll
    .mockResolvedValue([
      productoBackend
    ])


  render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  )


  await waitFor(() => {

    expect(
      productRepository.getAll
    ).toHaveBeenCalled()

  })
}


describe('CartContext', () => {

  beforeEach(() => {

    localStorage.clear()

    vi.clearAllMocks()
  })


  it(
    'inicia con el carrito vacío',
    async () => {

      await renderCart()


      expect(
        screen.getByTestId(
          'cantidad-productos'
        )
      ).toHaveTextContent('0')


      expect(
        screen.getByTestId(
          'total-items'
        )
      ).toHaveTextContent('0')
    }
  )


  it(
    'agrega un producto al carrito',
    async () => {

      await renderCart()


      fireEvent.click(
        screen.getByText(
          'Agregar'
        )
      )


      await waitFor(() => {

        expect(
          screen.getByTestId(
            'cantidad-productos'
          )
        ).toHaveTextContent('1')

      })


      expect(
        screen.getByTestId(
          'total-items'
        )
      ).toHaveTextContent('1')
    }
  )


  it(
    'calcula correctamente el subtotal',
    async () => {

      await renderCart()


      fireEvent.click(
        screen.getByText(
          'Agregar'
        )
      )


      await waitFor(() => {

        expect(
          screen.getByTestId(
            'subtotal'
          )
        ).toHaveTextContent(
          '45000'
        )

      })
    }
  )


  it(
    'actualiza la cantidad de un producto',
    async () => {

      await renderCart()


      fireEvent.click(
        screen.getByText(
          'Agregar'
        )
      )


      /*
       * Esperamos a que React termine
       * de agregar el producto antes
       * de cambiar su cantidad.
       */
      await waitFor(() => {

        expect(
          screen.getByTestId(
            'total-items'
          )
        ).toHaveTextContent('1')

      })


      fireEvent.click(
        screen.getByText(
          'Cambiar cantidad'
        )
      )


      await waitFor(() => {

        expect(
          screen.getByTestId(
            'total-items'
          )
        ).toHaveTextContent('3')

      })


      expect(
        screen.getByTestId(
          'subtotal'
        )
      ).toHaveTextContent(
        '135000'
      )
    }
  )


  it(
    'elimina un producto del carrito',
    async () => {

      await renderCart()


      fireEvent.click(
        screen.getByText(
          'Agregar'
        )
      )


      /*
       * Primero comprobamos que realmente
       * haya sido agregado.
       */
      await waitFor(() => {

        expect(
          screen.getByTestId(
            'cantidad-productos'
          )
        ).toHaveTextContent('1')

      })


      fireEvent.click(
        screen.getByText(
          'Eliminar'
        )
      )


      await waitFor(() => {

        expect(
          screen.getByTestId(
            'cantidad-productos'
          )
        ).toHaveTextContent('0')

      })


      expect(
        screen.getByTestId(
          'total-items'
        )
      ).toHaveTextContent('0')
    }
  )


  it(
    'vacía completamente el carrito',
    async () => {

      await renderCart()


      fireEvent.click(
        screen.getByText(
          'Agregar'
        )
      )


      await waitFor(() => {

        expect(
          screen.getByTestId(
            'total-items'
          )
        ).toHaveTextContent('1')

      })


      fireEvent.click(
        screen.getByText(
          'Vaciar carrito'
        )
      )


      await waitFor(() => {

        expect(
          screen.getByTestId(
            'cantidad-productos'
          )
        ).toHaveTextContent('0')

      })


      expect(
        screen.getByTestId(
          'total-items'
        )
      ).toHaveTextContent('0')
    }
  )

})