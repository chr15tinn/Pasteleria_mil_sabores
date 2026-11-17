function processPayment({
  medioPago,
  total,
  simulateFailure = false
}) {

  if (!medioPago) {

    return {
      success: false,
      message:
        'Debes seleccionar un medio de pago.'
    }
  }


  if (Number(total) <= 0) {

    return {
      success: false,
      message:
        'El monto de la compra no es válido.'
    }
  }


  /*
    Esta opción permite demostrar
    el flujo de pago rechazado
    durante las pruebas del sistema.
  */

  if (simulateFailure) {

    return {
      success: false,
      message:
        'El pago fue rechazado por la entidad financiera.'
    }
  }


  return {
    success: true,
    message:
      'Pago aprobado correctamente.'
  }
}


export const paymentService = {
  processPayment
}