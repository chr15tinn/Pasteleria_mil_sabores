import { describe, expect, it, vi } from 'vitest'

import {
  fireEvent,
  render,
  screen
} from '@testing-library/react'

import SearchBar from '../components/molecules/SearchBar'

describe('SearchBar', () => {

  it('muestra el valor de búsqueda recibido', () => {

    render(
      <SearchBar
        search="chocolate"
        onSearchChange={() => {}}
      />
    )

    expect(
      screen.getByDisplayValue('chocolate')
    ).toBeInTheDocument()

  })


  it('ejecuta onSearchChange al escribir', () => {

    const handleChange = vi.fn()

    render(
      <SearchBar
        search=""
        onSearchChange={handleChange}
      />
    )

    const input =
      screen.getByPlaceholderText(
        'Ej: chocolate, vegana, cheesecake...'
      )

    fireEvent.change(
      input,
      {
        target: {
          value: 'vainilla'
        }
      }
    )

    expect(
      handleChange
    ).toHaveBeenCalledWith(
      'vainilla'
    )

  })

})