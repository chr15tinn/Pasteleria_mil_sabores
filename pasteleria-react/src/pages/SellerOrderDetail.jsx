import { Link } from 'react-router-dom'

function SellerOrderDetail() {

  const order =
    JSON.parse(
      localStorage.getItem(
        'ordenSeleccionadaVendedor'
      )
    )


  if (!order) {

    return (

      <main className="container py-5">

        <div className="alert alert-warning">
          No se encontró una orden seleccionada.
        </div>

        <Link
          to="/vendedor/ordenes"
          className="btn btn-outline-dark"
        >
          Volver a órdenes
        </Link>

      </main>
    )
  }


  const products =
    order.productos || []


  return (

    <main className="container py-5">

      <div className="mb-4">

        <h1 className="titulo-principal">
          Detalle de Orden
        </h1>

        <p>
          Orden N° {order.numeroPedido}
        </p>

      </div>


      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h4 className="mb-3">
            Información de la orden
          </h4>

          <p>
            <strong>Cliente:</strong>{' '}
            {order.email}
          </p>

          <p>
            <strong>Fecha:</strong>{' '}
            {order.fecha}
          </p>

          <p>
            <strong>Estado:</strong>{' '}
            {
              order.estado ||
              'Pedido recibido'
            }
          </p>

          <p>
            <strong>Dirección:</strong>{' '}
            {order.direccion || 'No registrada'}
          </p>

          <p>
            <strong>Fecha de entrega:</strong>{' '}
            {
              order.fechaEntrega ||
              'No registrada'
            }
          </p>

        </div>

      </div>


      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h4 className="mb-3">
            Productos
          </h4>


          {
            products.length === 0
              ? (

                <p>
                  No hay productos registrados
                  en esta orden.
                </p>

              )
              : (

                <div className="table-responsive">

                  <table className="table table-bordered">

                    <thead>

                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                      </tr>

                    </thead>


                    <tbody>

                      {
                        products.map(item => (

                          <tr key={item.id}>

                            <td>
                              {item.name}
                            </td>

                            <td>
                              {item.quantity}
                            </td>

                            <td>
                              $
                              {
                                Number(
                                  item.price || 0
                                ).toLocaleString(
                                  'es-CL'
                                )
                              }
                            </td>

                            <td>
                              $
                              {
                                (
                                  Number(
                                    item.price || 0
                                  ) *
                                  Number(
                                    item.quantity || 1
                                  )
                                ).toLocaleString(
                                  'es-CL'
                                )
                              }
                            </td>

                          </tr>

                        ))
                      }

                    </tbody>

                  </table>

                </div>

              )
          }


          <div className="text-end mt-3">

            <h5>
              Total: $
              {
                Number(
                  order.total || 0
                ).toLocaleString(
                  'es-CL'
                )
              }
            </h5>

          </div>

        </div>

      </div>


      <Link
        to="/vendedor/ordenes"
        className="btn btn-outline-dark"
      >
        ← Volver a órdenes
      </Link>

    </main>
  )
}

export default SellerOrderDetail