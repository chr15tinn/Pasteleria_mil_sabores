import { describe, expect, it, vi } from 'vitest'

import {
  fireEvent,
  render,
  screen
} from '@testing-library/react'

import {
  MemoryRouter
} from 'react-router-dom'

import ProductCard from '../components/molecules/ProductCard'

const product = {
  id: 'TC001',
  category: 'Tortas Cuadradas',
  name: 'Torta Cuadrada de Chocolate',
  price: 45000,
  description:
    'Deliciosa torta de chocolate.',
  image: '',
  stock: 10,
  offer: false
}

describe('ProductCard', () => {

  it('renderiza los datos del producto', () => {

    render(
      <MemoryRouter>

        <ProductCard
          product={product}
          onAddToCart={() => {}}
        />

      </MemoryRouter>
    )

    expect(
      screen.getByText(
        'Torta Cuadrada de Chocolate'
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        '$45.000 CLP'
      )
    ).toBeInTheDocument()

  })


  it('agrega el producto al presionar el botón', () => {

    const handleAdd =
      vi.fn()

    render(
      <MemoryRouter>

        <ProductCard
          product={product}
          onAddToCart={handleAdd}
        />

      </MemoryRouter>
    )

    fireEvent.click(
      screen.getByText(
        'Agregar al carrito'
      )
    )

    expect(
      handleAdd
    ).toHaveBeenCalledWith(
      product
    )

  })

})