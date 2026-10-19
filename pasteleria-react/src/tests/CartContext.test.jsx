import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest'

import {
  fireEvent,
  render,
  screen
} from '@testing-library/react'

import {
  CartProvider,
  useCart
} from '../context/CartContext'


const producto = {
  id: 'TC001',
  name: 'Torta Cuadrada de Chocolate',
  price: 45000,
  stock: 10,
  quantity: 1
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


describe('CartContext', () => {

  beforeEach(() => {
    localStorage.clear()
  })


  it('inicia con el carrito vacío', () => {

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )


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

  })


  it('agrega un producto al carrito', () => {

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )


    fireEvent.click(
      screen.getByText(
        'Agregar'
      )
    )


    expect(
      screen.getByTestId(
        'cantidad-productos'
      )
    ).toHaveTextContent('1')


    expect(
      screen.getByTestId(
        'total-items'
      )
    ).toHaveTextContent('1')

  })


  it('calcula correctamente el subtotal', () => {

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )


    fireEvent.click(
      screen.getByText(
        'Agregar'
      )
    )


    expect(
      screen.getByTestId(
        'subtotal'
      )
    ).toHaveTextContent(
      '45000'
    )

  })


  it('actualiza la cantidad de un producto', () => {

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )


    fireEvent.click(
      screen.getByText(
        'Agregar'
      )
    )


    fireEvent.click(
      screen.getByText(
        'Cambiar cantidad'
      )
    )


    expect(
      screen.getByTestId(
        'total-items'
      )
    ).toHaveTextContent('3')


    expect(
      screen.getByTestId(
        'subtotal'
      )
    ).toHaveTextContent(
      '135000'
    )

  })


  it('elimina un producto del carrito', () => {

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )


    fireEvent.click(
      screen.getByText(
        'Agregar'
      )
    )


    fireEvent.click(
      screen.getByText(
        'Eliminar'
      )
    )


    expect(
      screen.getByTestId(
        'cantidad-productos'
      )
    ).toHaveTextContent('0')

  })


  it('vacía completamente el carrito', () => {

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )


    fireEvent.click(
      screen.getByText(
        'Agregar'
      )
    )


    fireEvent.click(
      screen.getByText(
        'Vaciar carrito'
      )
    )


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

  })

})