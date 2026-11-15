import { useNavigate } from 'react-router-dom'

function SellerOrders() {

  const navigate = useNavigate()

  const orders =
    JSON.parse(
      localStorage.getItem('pedidos')
    ) || []


  function verDetalle(order) {

    localStorage.setItem(
      'ordenSeleccionadaVendedor',
      JSON.stringify(order)
    )

    navigate('/vendedor/ordenes/detalle')
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


      {
        orders.length === 0
          ? (

            <div className="alert alert-info">
              No existen órdenes registradas.
            </div>

          )
          : (

            <div className="table-responsive">

              <table className="table table-bordered align-middle">

                <thead>

                  <tr>
                    <th>N° Orden</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Detalle</th>
                  </tr>

                </thead>


                <tbody>

                  {
                    orders.map(order => (

                      <tr key={order.numeroPedido}>

                        <td>
                          {order.numeroPedido}
                        </td>

                        <td>
                          {order.email}
                        </td>

                        <td>
                          {order.fecha}
                        </td>

                        <td>
                          $
                          {Number(
                            order.total || 0
                          ).toLocaleString('es-CL')}
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

                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() =>
                              verDetalle(order)
                            }
                          >
                            Ver detalle
                          </button>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>

          )
      }

    </main>
  )
}

export default SellerOrders