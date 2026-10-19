import { useState } from 'react'

function AdminOrders() {

  const [orders, setOrders] = useState(
    () =>
      JSON.parse(
        localStorage.getItem('pedidos')
      ) || []
  )


  const estados = [
    'Pedido recibido',
    'En preparación',
    'En camino',
    'Entregado'
  ]


  function cambiarEstado(
    numeroPedido,
    nuevoEstado
  ) {

    const updatedOrders =
      orders.map(order =>
        order.numeroPedido === numeroPedido
          ? {
              ...order,
              estado: nuevoEstado
            }
          : order
      )


    setOrders(updatedOrders)


    localStorage.setItem(
      'pedidos',
      JSON.stringify(updatedOrders)
    )


    const ultimaCompra =
      JSON.parse(
        localStorage.getItem(
          'ultimaCompra'
        )
      )


    if (
      ultimaCompra?.numeroPedido ===
      numeroPedido
    ) {

      const updatedLastOrder = {
        ...ultimaCompra,
        estado: nuevoEstado
      }

      localStorage.setItem(
        'ultimaCompra',
        JSON.stringify(
          updatedLastOrder
        )
      )
    }
  }


  if (orders.length === 0) {

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

              <tr
                key={
                  order.numeroPedido
                }
              >

                <td>
                  {
                    order.numeroPedido
                  }
                </td>

                <td>
                  {order.email}
                </td>

                <td>
                  {order.fecha}
                </td>

                <td>
                  $
                  {
                    Number(
                      order.total
                    )
                      .toLocaleString(
                        'es-CL'
                      )
                  }
                </td>

                <td>

                  <span className="badge bg-secondary">

                    {
                      order.estado ||
                      'Pedido recibido'
                    }

                  </span>

                </td>

                <td>

                  <select
                    className="form-select"
                    value={
                      order.estado ||
                      'Pedido recibido'
                    }
                    onChange={event =>
                      cambiarEstado(
                        order.numeroPedido,
                        event.target.value
                      )
                    }
                  >

                    {
                      estados.map(
                        estado => (

                          <option
                            key={estado}
                            value={estado}
                          >
                            {estado}
                          </option>

                        )
                      )
                    }

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