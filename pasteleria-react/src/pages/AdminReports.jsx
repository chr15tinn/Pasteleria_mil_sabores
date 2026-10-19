import { useMemo } from 'react'

import { productRepository } from '../repositories/productRepository'

function AdminReports() {

  const products =
    productRepository.getAll()

  const users =
    JSON.parse(
      localStorage.getItem('usuarios')
    ) || []

  const orders =
    JSON.parse(
      localStorage.getItem('pedidos')
    ) || []


  const totalSales =
    orders.reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    )


  const totalProductsSold =
    orders.reduce(
      (total, order) => {

        const orderItems =
          order.productos || []

        const quantity =
          orderItems.reduce(
            (sum, item) =>
              sum + Number(item.quantity || 0),
            0
          )

        return total + quantity
      },
      0
    )


  const criticalStock =
    products.filter(
      product =>
        Number(product.stock) <= 5
    )


  const productsSold =
    useMemo(() => {

      const summary = {}

      orders.forEach(order => {

        const items =
          order.productos || []

        items.forEach(item => {

          if (!summary[item.id]) {

            summary[item.id] = {
              id: item.id,
              name: item.name,
              quantity: 0
            }

          }

          summary[item.id].quantity +=
            Number(item.quantity || 0)

        })

      })


      return Object
        .values(summary)
        .sort(
          (a, b) =>
            b.quantity - a.quantity
        )

    }, [orders])


  const topProducts =
    productsSold.slice(0, 5)


  return (

    <main className="container py-5">

      <div className="mb-5">

        <h1
          style={{
            color: '#8B4513'
          }}
        >
          📊 Reportes
        </h1>

        <p>
          Resumen general de ventas,
          productos, usuarios y stock.
        </p>

      </div>


      <div className="row g-4 mb-5">

        <div className="col-12 col-md-6 col-xl-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5>
                💰 Ventas totales
              </h5>

              <h3>
                $
                {
                  totalSales
                    .toLocaleString('es-CL')
                }
              </h3>

            </div>

          </div>

        </div>


        <div className="col-12 col-md-6 col-xl-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5>
                📦 Pedidos
              </h5>

              <h3>
                {orders.length}
              </h3>

            </div>

          </div>

        </div>


        <div className="col-12 col-md-6 col-xl-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5>
                🧁 Productos vendidos
              </h5>

              <h3>
                {totalProductsSold}
              </h3>

            </div>

          </div>

        </div>


        <div className="col-12 col-md-6 col-xl-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5>
                👥 Usuarios
              </h5>

              <h3>
                {users.length}
              </h3>

            </div>

          </div>

        </div>

      </div>


      <div className="row g-4">

        <div className="col-lg-7">

          <div className="card shadow-sm p-4">

            <h4 className="mb-3">
              Productos más vendidos
            </h4>


            {
              topProducts.length === 0
                ? (

                  <div className="alert alert-info">
                    Todavía no existen ventas
                    suficientes para generar
                    este reporte.
                  </div>

                )
                : (

                  <div className="table-responsive">

                    <table className="table table-bordered">

                      <thead>

                        <tr>
                          <th>Producto</th>
                          <th>Unidades vendidas</th>
                        </tr>

                      </thead>


                      <tbody>

                        {
                          topProducts.map(
                            product => (

                              <tr key={product.id}>

                                <td>
                                  {product.name}
                                </td>

                                <td>
                                  {product.quantity}
                                </td>

                              </tr>

                            )
                          )
                        }

                      </tbody>

                    </table>

                  </div>

                )
            }

          </div>

        </div>


        <div className="col-lg-5">

          <div className="card shadow-sm p-4">

            <h4 className="mb-3">
              ⚠️ Stock crítico
            </h4>


            {
              criticalStock.length === 0
                ? (

                  <div className="alert alert-success">

                    No existen productos
                    con stock crítico.

                  </div>

                )
                : (

                  <ul className="list-group">

                    {
                      criticalStock.map(
                        product => (

                          <li
                            key={product.id}
                            className="list-group-item d-flex justify-content-between"
                          >

                            <span>
                              {product.name}
                            </span>

                            <span className="badge bg-danger">

                              {product.stock}

                            </span>

                          </li>

                        )
                      )
                    }

                  </ul>

                )
            }

          </div>

        </div>

      </div>

    </main>
  )
}

export default AdminReports