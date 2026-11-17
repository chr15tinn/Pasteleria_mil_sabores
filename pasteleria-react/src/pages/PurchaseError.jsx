import { Link } from 'react-router-dom'


function PurchaseError() {

  const failedPayment =
    JSON.parse(
      localStorage.getItem(
        'ultimoPagoFallido'
      )
    )


  return (

    <main className="container py-5">

      <div
        className="card shadow-sm mx-auto"
        style={{
          maxWidth: '650px'
        }}
      >

        <div className="card-body text-center p-5">

          <div
            style={{
              fontSize: '4rem'
            }}
          >
            ❌
          </div>


          <h1
            className="mt-3"
            style={{
              color: '#8B4513'
            }}
          >
            No se pudo realizar el pago
          </h1>


          <p className="mt-3">
            {
              failedPayment?.mensaje ||
              'Ocurrió un problema al procesar el pago.'
            }
          </p>


          {failedPayment && (

            <div
              className="alert alert-light text-start mt-4"
            >

              <p className="mb-2">

                <strong>
                  Medio de pago:
                </strong>{' '}

                {failedPayment.medioPago}

              </p>


              <p className="mb-2">

                <strong>
                  Monto:
                </strong>{' '}

                $
                {
                  Number(
                    failedPayment.total
                  ).toLocaleString(
                    'es-CL'
                  )
                }

              </p>


              <p className="mb-0">

                <strong>
                  Fecha:
                </strong>{' '}

                {failedPayment.fecha}

              </p>

            </div>

          )}


          <p className="text-muted mt-4">
            No se generó ninguna orden
            y puedes intentar realizar
            el pago nuevamente.
          </p>


          <div
            className="d-flex gap-2 justify-content-center mt-4"
          >

            <Link
              to="/carrito"
              className="btn btn-outline-dark"
            >
              Volver al carrito
            </Link>


            <Link
              to="/checkout"
              className="btn btn-dark"
            >
              Intentar nuevamente
            </Link>

          </div>

        </div>

      </div>

    </main>
  )
}


export default PurchaseError