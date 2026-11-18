import { Link } from 'react-router-dom'

function Tracking() {

  const pedido =
    JSON.parse(
      localStorage.getItem(
        'pedidoSeleccionado'
      )
    )


  if (!pedido) {

    return (
      <main className="container py-5">

        <div className="alert alert-warning text-center">
          No seleccionaste ningún pedido.
        </div>

      </main>
    )
  }


  const estados = [
    'Pedido recibido',
    'En preparación',
    'En camino',
    'Entregado'
  ]


  const posicionActual =
    Math.max(
      0,
      estados.indexOf(
        pedido.estado
      )
    )


  const iconos = [
    '✅',
    '👨‍🍳',
    '🚚',
    '🎂'
  ]


  return (
    <main className="container py-5">

      <div
        className="card shadow-sm p-4 mx-auto"
        style={{
          maxWidth: '800px'
        }}
      >

        <h1
          className="text-center mb-4"
          style={{
            color: '#8B4513'
          }}
        >
          📦 Seguimiento del pedido
        </h1>


        <h5>
          Pedido {pedido.numeroPedido}
        </h5>


        <p>
          <strong>Cliente:</strong>{' '}
          {pedido.email}
        </p>


        <p>
          <strong>Total:</strong>{' '}
          $
          {Number(
            pedido.total
          ).toLocaleString('es-CL')}
        </p>


        <hr />


        <h5 className="mb-4">
          Estado del pedido
        </h5>


        {estados.map(
          (estado, index) => {

            let clase =
              'border rounded p-3 mb-2'

            if (
              index <
              posicionActual
            ) {

              clase +=
                ' bg-success-subtle'

            } else if (
              index ===
              posicionActual
            ) {

              clase +=
                ' bg-warning-subtle fw-bold'

            } else {

              clase +=
                ' bg-light text-muted'

            }


            return (

              <div
                key={estado}
                className={clase}
              >

                {iconos[index]}
                {' '}
                {estado}

              </div>

            )
          }
        )}


        <div className="alert alert-info mt-4">

          Estado actual:
          {' '}

          <strong>
            {pedido.estado}
          </strong>

        </div>


        <div className="text-center mt-4">

          <Link
            to="/pedidos"
            className="btn btn-outline-dark"
          >
            Volver a mis pedidos
          </Link>

        </div>

      </div>

    </main>
  )
}

export default Tracking