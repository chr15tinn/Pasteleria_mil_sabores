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


function SellerOrders() {

  const navigate =
    useNavigate()

  const [orders, setOrders] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {

    async function loadOrders() {

      try {

        setLoading(true)
        setError('')


        const data =
          await apiRequest(
            '/boletas'
          )


        setOrders(
          data
        )

      } catch (error) {

        console.error(
          'Error al cargar órdenes:',
          error
        )


        if (
          error.status === 403
        ) {

          setError(
            'No tienes permiso para consultar las órdenes.'
          )

          return
        }


        setError(
          'No fue posible cargar las órdenes.'
        )

      } finally {

        setLoading(false)
      }
    }


    loadOrders()

  }, [])


  function verDetalle(order) {

    localStorage.setItem(
      'ordenSeleccionadaVendedor',
      JSON.stringify(
        order
      )
    )

    navigate(
      '/vendedor/ordenes/detalle'
    )
  }


  if (loading) {

    return (

      <main className="container py-5">

        <p className="text-center">
          Cargando órdenes...
        </p>

      </main>
    )
  }


  if (error) {

    return (

      <main className="container py-5">

        <div className="alert alert-danger">

          {error}

        </div>

      </main>
    )
  }


  return (

    <main className="container py-5">

      <div className="mb-4">

        <h1 className="titulo-principal">

          Órdenes

        </h1>

        <p className="subtitulo-seccion">

          Consulta las órdenes registradas
          en la tienda.

        </p>

      </div>


      {orders.length === 0 ? (

        <div className="alert alert-info">

          No existen órdenes registradas.

        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered align-middle">

            <thead>

              <tr>

                <th>
                  N° Orden
                </th>

                <th>
                  Cliente
                </th>

                <th>
                  Fecha
                </th>

                <th>
                  Total
                </th>

                <th>
                  Estado
                </th>

                <th>
                  Detalle
                </th>

              </tr>

            </thead>


            <tbody>

              {orders.map(
                order => (

                  <tr key={order.id}>

                    <td>

                      PED-{order.id}

                    </td>


                    <td>

                      {order.usuario?.email ||
                        'Sin correo'}

                    </td>


                    <td>

                      {order.fecha
                        ? new Date(
                            order.fecha
                          ).toLocaleString(
                            'es-CL'
                          )
                        : 'Sin fecha'}

                    </td>


                    <td>

                      $
                      {Number(
                        order.total || 0
                      ).toLocaleString(
                        'es-CL'
                      )}

                    </td>


                    <td>

                      <span className="badge bg-secondary">

                        {order.estado ||
                          'Pedido recibido'}

                      </span>

                    </td>


                    <td>

                      <button
                        className="btn btn-outline-dark btn-sm"
                        onClick={() =>
                          verDetalle(
                            order
                          )
                        }
                      >

                        Ver detalle

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </main>
  )
}

export default SellerOrders