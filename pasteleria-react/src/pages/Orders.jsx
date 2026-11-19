import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import {
  apiRequest
} from '../services/api'


function Orders() {

  const navigate =
    useNavigate()

  const [pedidos, setPedidos] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {

    async function cargarPedidos() {

      try {

        setLoading(true)
        setError('')


        const data =
          await apiRequest(
            '/boletas/mis-boletas'
          )


        const pedidosAdaptados =
          data.map(pedido => ({

            id:
              pedido.id,

            numeroPedido:
              `PED-${pedido.id}`,

            fecha:
              pedido.fecha
                ? new Date(
                    pedido.fecha
                  ).toLocaleString(
                    'es-CL'
                  )
                : 'Sin fecha',

            total:
              Number(
                pedido.total || 0
              ),

            estado:
              pedido.estado ||
              'Pedido recibido',

            direccion:
              pedido.direccion ||
              'Sin dirección',

            medioPago:
              pedido.medioPago ||
              'No registrado',

            productos:
              (pedido.productos || [])
                .map(producto => ({

                  id:
                    producto.id,

                  name:
                    producto.nombre,

                  quantity:
                    Number(
                      producto.cantidad || 0
                    ),

                  price:
                    Number(
                      producto.precio || 0
                    ),

                  subtotal:
                    Number(
                      producto.subtotal || 0
                    )
                }))
          }))


        setPedidos(
          pedidosAdaptados
        )

      } catch (error) {

        console.error(
          'Error al cargar pedidos:',
          error
        )


        if (
          error.status === 401
        ) {

          setError(
            'Tu sesión expiró. Inicia sesión nuevamente.'
          )

          return
        }


        if (
          error.status === 403
        ) {

          setError(
            'No tienes permiso para consultar tus pedidos.'
          )

          return
        }


        setError(
          'No fue posible cargar tus pedidos.'
        )

      } finally {

        setLoading(false)
      }
    }


    cargarPedidos()

  }, [])


  function verSeguimiento(
    pedido
  ) {

    localStorage.setItem(
      'pedidoSeleccionado',
      JSON.stringify(
        pedido
      )
    )

    navigate(
      '/seguimiento'
    )
  }


  if (loading) {

    return (

      <main className="container py-5">

        <p className="text-center">
          Cargando tus pedidos...
        </p>

      </main>
    )
  }


  if (error) {

    return (

      <main className="container py-5">

        <div className="alert alert-danger text-center">

          {error}

        </div>

      </main>
    )
  }


  if (
    pedidos.length === 0
  ) {

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

        {pedidos.map(
          pedido => (

            <div
              key={pedido.id}
              className="col-12"
            >

              <div className="card shadow-sm">

                <div className="card-body">

                  <div
                    className="d-flex justify-content-between flex-wrap gap-2"
                  >

                    <h5>

                      Pedido{' '}
                      {pedido.numeroPedido}

                    </h5>


                    <span className="badge bg-secondary">

                      {pedido.estado}

                    </span>

                  </div>


                  <hr />


                  <p>

                    <strong>
                      Fecha:
                    </strong>{' '}

                    {pedido.fecha}

                  </p>


                  <p>

                    <strong>
                      Total:
                    </strong>{' '}

                    $
                    {pedido.total
                      .toLocaleString(
                        'es-CL'
                      )}

                  </p>


                  <p>

                    <strong>
                      Dirección:
                    </strong>{' '}

                    {pedido.direccion}

                  </p>


                  <p>

                    <strong>
                      Medio de pago:
                    </strong>{' '}

                    {pedido.medioPago}

                  </p>


                  <h6>
                    Productos:
                  </h6>


                  {pedido.productos.length === 0 ? (

                    <p className="text-muted">

                      No existen productos
                      asociados a este pedido.

                    </p>

                  ) : (

                    <ul>

                      {pedido.productos.map(
                        item => (

                          <li
                            key={item.id}
                          >

                            {item.name}

                            {' '}

                            x{item.quantity}

                          </li>

                        )
                      )}

                    </ul>

                  )}


                  <div className="text-end">

                    <button
                      className="btn btn-dark"
                      onClick={() =>
                        verSeguimiento(
                          pedido
                        )
                      }
                    >
                      Ver seguimiento
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </main>
  )
}

export default Orders