import {
  useEffect,
  useState
} from 'react'

import {
  Link
} from 'react-router-dom'

import {
  apiRequest
} from '../services/api'


function SellerOrderDetail() {

  const [order, setOrder] =
    useState(null)

  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {

    async function loadOrderDetail() {

      try {

        setLoading(true)
        setError('')


        const selectedOrder =
          JSON.parse(
            localStorage.getItem(
              'ordenSeleccionadaVendedor'
            )
          )


        if (!selectedOrder) {

          setError(
            'No se encontró una orden seleccionada.'
          )

          return
        }


        setOrder(
          selectedOrder
        )


        const detalles =
          await apiRequest(
            '/detalles-boleta'
          )


        const detallesOrden =
          detalles.filter(
            detalle =>
              Number(
                detalle.boleta?.id
              ) ===
              Number(
                selectedOrder.id
              )
          )


        const adaptedProducts =
          detallesOrden.map(
            detalle => ({

              id:
                detalle.producto?.id,

              name:
                detalle.producto?.nombre ||
                'Producto',

              quantity:
                Number(
                  detalle.cantidad || 0
                ),

              price:
                Number(
                  detalle.precioUnitario || 0
                ),

              subtotal:
                Number(
                  detalle.subtotal || 0
                )

            })
          )


        setProducts(
          adaptedProducts
        )

      } catch (error) {

        console.error(
          'Error al cargar detalle de la orden:',
          error
        )


        if (error.status === 403) {

          setError(
            'No tienes permiso para consultar esta orden.'
          )

          return
        }


        setError(
          'No fue posible cargar el detalle de la orden.'
        )

      } finally {

        setLoading(false)
      }
    }


    loadOrderDetail()

  }, [])


  if (loading) {

    return (

      <main className="container py-5">

        <p className="text-center">
          Cargando orden...
        </p>

      </main>
    )
  }


  if (
    error ||
    !order
  ) {

    return (

      <main className="container py-5">

        <div className="alert alert-warning">
          {error ||
            'No se encontró una orden seleccionada.'}
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


  return (

    <main className="container py-5">

      <div className="mb-4">

        <h1 className="titulo-principal">
          Detalle de Orden
        </h1>

        <p>
          Orden N° PED-{order.id}
        </p>

      </div>


      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h4 className="mb-3">
            Información de la orden
          </h4>


          <p>

            <strong>
              Cliente:
            </strong>{' '}

            {order.usuario?.nombre ||
              order.nombre ||
              'No registrado'}

          </p>


          <p>

            <strong>
              Correo:
            </strong>{' '}

            {order.usuario?.email ||
              order.email ||
              'No registrado'}

          </p>


          <p>

            <strong>
              Fecha:
            </strong>{' '}

            {order.fecha
              ? new Date(
                  order.fecha
                ).toLocaleString(
                  'es-CL'
                )
              : 'No registrada'}

          </p>


          <p>

            <strong>
              Estado:
            </strong>{' '}

            {order.estado ||
              'Pedido recibido'}

          </p>


          <p>

            <strong>
              Dirección:
            </strong>{' '}

            {order.direccion ||
              'No registrada'}

          </p>


          <p>

            <strong>
              Medio de pago:
            </strong>{' '}

            {order.medioPago ||
              'No registrado'}

          </p>

        </div>

      </div>


      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h4 className="mb-3">
            Productos
          </h4>


          {products.length === 0 ? (

            <p>
              No hay productos registrados
              en esta orden.
            </p>

          ) : (

            <div className="table-responsive">

              <table className="table table-bordered">

                <thead>

                  <tr>

                    <th>
                      Producto
                    </th>

                    <th>
                      Cantidad
                    </th>

                    <th>
                      Precio
                    </th>

                    <th>
                      Subtotal
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {products.map(
                    item => (

                      <tr key={item.id}>

                        <td>
                          {item.name}
                        </td>

                        <td>
                          {item.quantity}
                        </td>

                        <td>

                          $
                          {item.price
                            .toLocaleString(
                              'es-CL'
                            )}

                        </td>

                        <td>

                          $
                          {item.subtotal
                            .toLocaleString(
                              'es-CL'
                            )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}


          <div className="text-end mt-3">

            <h5>

              Total: $

              {Number(
                order.total || 0
              ).toLocaleString(
                'es-CL'
              )}

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