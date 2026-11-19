import {
  describe,
  expect,
  it,
  vi
} from 'vitest'


vi.mock(
  '../services/authService',
  () => ({
    authService: {

      isBirthdayToday:
        vi.fn(
          () => false
        )
    }
  })
)


import {
  discountService
} from '../services/discountService'


const cart = [

  {
    id: 1,

    name:
      'Torta Cuadrada de Chocolate',

    price:
      45000,

    quantity:
      1
  },

  {
    id: 5,

    name:
      'Mousse de Chocolate',

    price:
      5000,

    quantity:
      2
  }

]


describe(
  'discountService',
  () => {

    it(
      'calcula correctamente el subtotal',
      () => {

        const subtotal =
          discountService
            .calculateSubtotal(
              cart
            )


        expect(
          subtotal
        ).toBe(
          55000
        )
      }
    )


    it(
      'calcula cero para un carrito vacío',
      () => {

        const subtotal =
          discountService
            .calculateSubtotal(
              []
            )


        expect(
          subtotal
        ).toBe(0)
      }
    )


    it(
      'mantiene el total sin descuento cuando el usuario no tiene beneficios',
      () => {

        const user = {

          nombre:
            'Christian',

          beneficios: {

            descuentoAplicable:
              0,

            motivoDescuento:
              null,

            esEstudianteDuoc:
              false
          }
        }


        const result =
          discountService
            .calculateOrderBenefits(
              cart,
              user
            )


        expect(
          result.subtotal
        ).toBe(
          55000
        )


        expect(
          result.totalDiscount
        ).toBe(0)


        expect(
          result.total
        ).toBe(
          55000
        )
      }
    )


    it(
      'aplica correctamente el descuento de aniversario del 10%',
      () => {

        const user = {

          nombre:
            'Christian',

          beneficios: {

            descuentoAplicable:
              10,

            motivoDescuento:
              'Descuento aniversario Pastelería 1000 Sabores - código FELICES50',

            esEstudianteDuoc:
              false
          }
        }


        const result =
          discountService
            .calculateOrderBenefits(
              cart,
              user
            )


        expect(
          result.percentage
        ).toBe(10)


        expect(
          result.percentageDiscount
        ).toBe(
          5500
        )


        expect(
          result.total
        ).toBe(
          49500
        )
      }
    )

  }
)