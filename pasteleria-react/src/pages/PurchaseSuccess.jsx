import { Link } from 'react-router-dom'

function PurchaseSuccess() {

  const pedido =
    JSON.parse(
      localStorage.getItem(
        'ultimaCompra'
      )
    )


  if (!pedido) {

    return (

      <main className="container py-5">

        <div className="alert alert-warning text-center">

          No existe una compra reciente.

        </div>

      </main>

    )
  }


  return (

    <main className="container py-5">

      <div
        className="card shadow-sm p-5 mx-auto"
        style={{
          maxWidth: '800px'
        }}
      >

        <div className="text-center">

          <h1
            style={{
              color: '#8B4513'
            }}
          >
            ✅ Compra realizada
          </h1>

          <p className="lead">

            Tu pedido fue registrado correctamente.

          </p>

        </div>


        <hr />


        <p>
          <strong>
            Número de pedido:
          </strong>{' '}

          {pedido.numeroPedido}
        </p>


        <p>
          <strong>
            Fecha:
          </strong>{' '}

          {pedido.fecha}
        </p>


        <p>
          <strong>
            Cliente:
          </strong>{' '}

          {pedido.email}
        </p>


        <h5 className="mt-4">
          Productos
        </h5>


        <ul className="list-group mb-4">

          {pedido.productos.map(
            item => (

              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between"
              >

                <span>
                  {item.name}
                  {' '}
                  x{item.quantity}
                </span>

                <span>

                  $
                  {
                    (
                      item.price *
                      item.quantity
                    )
                      .toLocaleString('es-CL')
                  }

                </span>

              </li>

            )
          )}

        </ul>


        <h4 className="text-end">

          Total:
          {' '}
          $
          {
            pedido.total
              .toLocaleString('es-CL')
          }

        </h4>


        <hr />


        <p>
          <strong>
            Dirección:
          </strong>{' '}

          {pedido.direccion},
          {' '}
          {pedido.comuna},
          {' '}
          {pedido.region}
        </p>


        <p>
          <strong>
            Fecha de entrega:
          </strong>{' '}

          {pedido.fechaEntrega}
        </p>


        <p>
          <strong>
            Estado:
          </strong>{' '}

          {pedido.estado}
        </p>


        <div
          className="d-flex gap-2 justify-content-center mt-4"
        >

          <Link
            to="/"
            className="btn btn-outline-dark"
          >
            Volver al inicio
          </Link>


          <Link
            to="/pedidos"
            className="btn btn-dark"
          >
            Mis pedidos
          </Link>

        </div>

      </div>

    </main>
  )
}

export default PurchaseSuccess