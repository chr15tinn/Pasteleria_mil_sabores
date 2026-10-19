import { authService } from './authService'


function calculateSubtotal(cart) {

  return cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
      Number(item.quantity || 1),
    0
  )
}


function getFreeBirthdayCake(
  cart,
  user
) {

  if (!user) {
    return null
  }


  const isDuoc =
    user.beneficios
      ?.esEstudianteDuoc === true


  const isBirthday =
    authService.isBirthdayToday(
      user.fechaNacimiento
    )


  if (
    !isDuoc ||
    !isBirthday
  ) {
    return null
  }


  const cakes =
    cart.filter(item =>
      item.name
        ?.toLowerCase()
        .includes('torta')
    )


  if (cakes.length === 0) {
    return null
  }


  /*
    Para el proyecto se considera
    gratuita una unidad de la torta
    de menor valor presente
    en el carrito.
  */

  return cakes.reduce(
    (cheapest, item) =>
      Number(item.price) <
      Number(cheapest.price)
        ? item
        : cheapest
  )
}


function calculateOrderBenefits(
  cart,
  user
) {

  const subtotal =
    calculateSubtotal(cart)


  if (!user) {

    return {
      subtotal,
      percentage: 0,
      percentageDiscount: 0,
      freeCakeDiscount: 0,
      freeCake: null,
      totalDiscount: 0,
      total: subtotal,
      reason: null
    }
  }


  const percentage =
    Number(
      user.beneficios
        ?.descuentoAplicable || 0
    )


  const reason =
    user.beneficios
      ?.motivoDescuento || null


  const freeCake =
    getFreeBirthdayCake(
      cart,
      user
    )


  const freeCakeDiscount =
    freeCake
      ? Number(freeCake.price)
      : 0


  /*
    Primero se descuenta la torta
    de cumpleaños y después se aplica
    el porcentaje sobre el saldo.
  */

  const subtotalAfterCake =
    Math.max(
      subtotal -
      freeCakeDiscount,
      0
    )


  const percentageDiscount =
    Math.round(
      subtotalAfterCake *
      percentage /
      100
    )


  const totalDiscount =
    freeCakeDiscount +
    percentageDiscount


  const total =
    Math.max(
      subtotal -
      totalDiscount,
      0
    )


  return {
    subtotal,
    percentage,
    percentageDiscount,
    freeCakeDiscount,
    freeCake,
    totalDiscount,
    total,
    reason
  }
}


export const discountService = {
  calculateSubtotal,
  getFreeBirthdayCake,
  calculateOrderBenefits
}