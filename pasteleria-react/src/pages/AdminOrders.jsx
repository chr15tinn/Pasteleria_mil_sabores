import { useEffect, useState } from 'react'
import { apiRequest } from '../services/api'

function AdminOrders() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const estados = [
    'Pedido recibido',
    'En preparación',
    'En camino',
    'Entregado'
  ]


  async function loadOrders() {

    try {

      setLoading(true)
      setMessage('')

      const data =
        await apiRequest('/boletas')

      const adaptedOrders =
        data.map(order => ({
          id: order.id,

          numeroPedido:
            order.id,

          email:
            order.usuario?.email || 'Sin correo',

          nombre:
            order.usuario?.nombre || 'Sin nombre',

          fechaOriginal:
          order.fecha,

          fecha:
            order.fecha
              ? new Date(order.fecha)
                  .toLocaleString('es-CL')
              : 'Sin fecha',

          total:
            Number(order.total || 0),

          estado:
            order.estado || 'Pedido recibido',

          direccion:
            order.direccion || '',

          medioPago:
            order.medioPago || '',

          usuario:
            order.usuario
        }))

      setOrders(adaptedOrders)

    } catch (error) {

      console.error(
        'Error al cargar pedidos:',
        error
      )

      setMessage(
        'No fue posible cargar los pedidos.'
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {
    loadOrders()
  }, [])


  async function cambiarEstado(
    order,
    nuevoEstado
  ) {

    try {

      setMessage('')

      const updatedOrder = {
        fecha:
          order.fechaOriginal ||
          new Date().toISOString(),

        total:
          order.total,

        estado:
          nuevoEstado,

        direccion:
          order.direccion,

        medioPago:
          order.medioPago,

        usuario: {
          id:
            order.usuario?.id
        }
      }


      await apiRequest(
        `/boletas/${order.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(
            updatedOrder
          )
        }
      )


      setOrders(current =>
        current.map(item =>
          item.id === order.id
            ? {
                ...item,
                estado: nuevoEstado
              }
            : item
        )
      )


      setMessage(
        '✅ Estado actualizado correctamente.'
      )

    } catch (error) {

      console.error(
        'Error al actualizar pedido:',
        error
      )

      if (error.status === 403) {

        setMessage(
          'No tienes permiso para modificar pedidos.'
        )

        return
      }

      setMessage(
        'No fue posible actualizar el pedido.'
      )
    }
  }


  if (loading) {

    return (
      <main className="container py-5">

        <p className="text-center">
          Cargando pedidos...
        </p>

      </main>
    )
  }


  if (
    orders.length === 0 &&
    !message
  ) {

    return (
      <main className="container py-5">

        <div className="alert alert-warning text-center">
          No existen pedidos registrados.
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
        📦 Gestión de pedidos
      </h1>


      {message && (

        <div className="alert alert-info">
          {message}
        </div>

      )}


      <div className="table-responsive">

        <table className="table table-bordered align-middle">

          <thead>

            <tr>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Cambiar estado</th>
            </tr>

          </thead>


          <tbody>

            {orders.map(order => (

              <tr key={order.id}>

                <td>
                  #{order.numeroPedido}
                </td>


                <td>

                  <div>
                    <strong>
                      {order.nombre}
                    </strong>
                  </div>

                  <small className="text-muted">
                    {order.email}
                  </small>

                </td>


                <td>
                  {order.fecha}
                </td>


                <td>
                  $
                  {Number(
                    order.total
                  ).toLocaleString(
                    'es-CL'
                  )}
                </td>


                <td>

                  <span className="badge bg-secondary">

                    {order.estado}

                  </span>

                </td>


                <td>

                  <select
                    className="form-select"
                    value={order.estado}
                    onChange={event =>
                      cambiarEstado(
                        order,
                        event.target.value
                      )
                    }
                  >

                    {estados.map(
                      estado => (

                        <option
                          key={estado}
                          value={estado}
                        >
                          {estado}
                        </option>

                      )
                    )}

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  )
}

export default AdminOrders