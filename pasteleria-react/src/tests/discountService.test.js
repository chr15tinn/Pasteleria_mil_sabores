import {
  describe,
  expect,
  it
} from 'vitest'

import {
  discountService
} from '../services/discountService'


const cart = [
  {
    id: 'TC001',
    name:
      'Torta Cuadrada de Chocolate',
    price: 45000,
    quantity: 1
  },

  {
    id: 'PI001',
    name:
      'Mousse de Chocolate',
    price: 5000,
    quantity: 2
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
        ).toBe(55000)

      }
    )


    it(
      'mantiene el total sin descuento cuando el usuario no tiene beneficios',
      () => {

        const user = {

          nombre:
            'Christian',

          fechaNacimiento:
            '1995-05-10',

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
        ).toBe(55000)


        expect(
          result.totalDiscount
        ).toBe(0)


        expect(
          result.total
        ).toBe(55000)

      }
    )


    it(
      'aplica correctamente un descuento del 10%',
      () => {

        const user = {

          nombre:
            'Christian',

          fechaNacimiento:
            '1995-05-10',

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
        ).toBe(5500)


        expect(
          result.total
        ).toBe(49500)

      }
    )


    it(
      'aplica correctamente un descuento del 50%',
      () => {

        const user = {

          nombre:
            'Christian',

          fechaNacimiento:
            '1960-05-10',

          beneficios: {

            descuentoAplicable:
              50,

            motivoDescuento:
              'Descuento mayor de 50 años',

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
          result.percentageDiscount
        ).toBe(27500)


        expect(
          result.total
        ).toBe(27500)

      }
    )

  }
)