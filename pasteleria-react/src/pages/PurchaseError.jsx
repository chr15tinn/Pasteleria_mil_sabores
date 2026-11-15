import { Link } from 'react-router-dom'

function PurchaseError() {

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

          <p className="mt-3 text-muted">
            Ocurrió un problema al procesar
            la compra. No se ha generado
            ningún pedido.
          </p>

          <p>
            Puedes volver al carrito
            e intentar nuevamente.
          </p>


          <div className="d-flex gap-2 justify-content-center mt-4">

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
