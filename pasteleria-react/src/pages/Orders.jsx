import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Orders() {

  const navigate = useNavigate()
  const { user } = useAuth()

  const pedidos =
    JSON.parse(
      localStorage.getItem('pedidos')
    ) || []

  const pedidosUsuario =
    user
      ? pedidos.filter(
          pedido =>
            pedido.usuarioId === user.id ||
            pedido.email === user.email
        )
      : pedidos


  function verSeguimiento(pedido) {

    localStorage.setItem(
      'pedidoSeleccionado',
      JSON.stringify(pedido)
    )

    navigate('/seguimiento')
  }


  if (pedidosUsuario.length === 0) {

    return (
      <main className="container py-5">

        <div className="alert alert-warning text-center">
          No tienes pedidos registrados.
        </div>

      </main>
    )
  }


  return (
    <main className="container py-5">

      <h1
        className="mb-4"
        style={{
          color: '#8B4513'
        }}
      >
        📦 Mis pedidos
      </h1>


      <div className="row g-4">

        {[...pedidosUsuario]
          .reverse()
          .map(pedido => (

          <div
            key={pedido.numeroPedido}
            className="col-12"
          >

            <div className="card shadow-sm">

              <div className="card-body">

                <div
                  className="d-flex justify-content-between flex-wrap gap-2"
                >

                  <h5>
                    Pedido {pedido.numeroPedido}
                  </h5>

                  <span className="badge bg-secondary">
                    {pedido.estado}
                  </span>

                </div>


                <hr />


                <p>
                  <strong>Fecha:</strong>{' '}
                  {pedido.fecha}
                </p>


                <p>
                  <strong>Total:</strong>{' '}
                  $
                  {Number(
                    pedido.total
                  ).toLocaleString('es-CL')}
                </p>


                <p>
                  <strong>Dirección:</strong>{' '}
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


                <h6>
                  Productos:
                </h6>


                <ul>

                  {pedido.productos?.map(
                    item => (

                      <li key={item.id}>
                        {item.name}
                        {' '}
                        x{item.quantity}
                      </li>

                    )
                  )}

                </ul>


                <div className="text-end">

                  <button
                    className="btn btn-dark"
                    onClick={() =>
                      verSeguimiento(pedido)
                    }
                  >
                    Ver seguimiento
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}

export default Orders