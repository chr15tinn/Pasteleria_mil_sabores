import { describe, expect, it, vi } from 'vitest'

import {
  fireEvent,
  render,
  screen
} from '@testing-library/react'

import Button from '../components/atoms/Button'

describe('Button', () => {

  it('muestra correctamente el texto recibido', () => {

    render(
      <Button>
        Comprar
      </Button>
    )

    expect(
      screen.getByText('Comprar')
    ).toBeInTheDocument()

  })


  it('ejecuta onClick cuando se presiona', () => {

    const handleClick = vi.fn()

    render(
      <Button onClick={handleClick}>
        Agregar
      </Button>
    )

    fireEvent.click(
      screen.getByText('Agregar')
    )

    expect(
      handleClick
    ).toHaveBeenCalledTimes(1)

  })

})