import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { productRepository } from '../repositories/productRepository'
import { apiRequest } from '../services/api'

function AdminDashboard() {

  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  useEffect(() => {

    async function loadDashboard() {

      try {

        setLoading(true)
        setError('')

        const [
          productsData,
          usersData,
          ordersData
        ] = await Promise.all([
          productRepository.getAll(),
          apiRequest('/usuarios'),
          apiRequest('/boletas')
        ])


        const adaptedProducts =
          productsData.map(product => ({
            id: product.id,
            name: product.nombre,
            stock: product.stock,
            price: Number(product.precio)
          }))


        setProducts(adaptedProducts)
        setUsers(usersData)
        setOrders(ordersData)

      } catch (error) {

        console.error(
          'Error al cargar dashboard:',
          error
        )

        setError(
          'No fue posible cargar la información del panel.'
        )

      } finally {

        setLoading(false)
      }
    }

    loadDashboard()

  }, [])


  const criticalStock =
    products.filter(
      product => product.stock <= 5
    )


  const totalSales =
    orders.reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    )


  if (loading) {

    return (
      <main className="container py-5">

        <p className="text-center">
          Cargando panel de administración...
        </p>

      </main>
    )
  }


  return (

    <main className="container py-5">

      <div className="mb-5">

        <h1
          style={{
            color: '#8B4513'
          }}
        >
          Panel de Administración
        </h1>

        <p>
          Resumen general de la tienda
          Pastelería 1000 Sabores.
        </p>

      </div>


      {error && (

        <div className="alert alert-danger">
          {error}
        </div>

      )}


      <div className="row g-4 mb-5">

        <div className="col-12 col-md-6 col-xl-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5>
                🛍️ Productos
              </h5>

              <h2>
                {products.length}
              </h2>

              <p className="text-muted mb-0">
                Productos registrados
              </p>

            </div>

          </div>

        </div>


        <div className="col-12 col-md-6 col-xl-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5>
                👥 Usuarios
              </h5>

              <h2>
                {users.length}
              </h2>

              <p className="text-muted mb-0">
                Usuarios registrados
              </p>

            </div>

          </div>

        </div>


        <div className="col-12 col-md-6 col-xl-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5>
                📦 Pedidos
              </h5>

              <h2>
                {orders.length}
              </h2>

              <p className="text-muted mb-0">
                Pedidos realizados
              </p>

            </div>

          </div>

        </div>


        <div className="col-12 col-md-6 col-xl-3">

          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5>
                💰 Ventas
              </h5>

              <h2>
                $
                {totalSales.toLocaleString(
                  'es-CL'
                )}
              </h2>

              <p className="text-muted mb-0">
                Total acumulado
              </p>

            </div>

          </div>

        </div>

      </div>


      <div className="row g-4">

        <div className="col-lg-8">

          <div className="card shadow-sm p-4">

            <h4 className="mb-4">
              Accesos administrativos
            </h4>


            <div className="row g-3">

              <div className="col-md-6">

                <Link
                  to="/admin/productos"
                  className="btn btn-outline-dark w-100 p-4"
                >
                  🧁 Gestionar productos
                </Link>

              </div>


              <div className="col-md-6">

                <Link
                  to="/admin/pedidos"
                  className="btn btn-outline-dark w-100 p-4"
                >
                  📦 Gestionar pedidos
                </Link>

              </div>


              <div className="col-md-6">

                <Link
                  to="/admin/usuarios"
                  className="btn btn-outline-dark w-100 p-4"
                >
                  👥 Gestionar usuarios
                </Link>

              </div>


              <div className="col-md-6">

                <Link
                  to="/admin/reportes"
                  className="btn btn-outline-dark w-100 p-4"
                >
                  📊 Reportes
                </Link>

              </div>

            </div>

          </div>

        </div>


        <div className="col-lg-4">

          <div className="card shadow-sm p-4">

            <h4>
              ⚠️ Stock crítico
            </h4>


            {criticalStock.length === 0 ? (

              <div className="alert alert-success mt-3">

                No existen productos
                con stock crítico.

              </div>

            ) : (

              <ul className="list-group mt-3">

                {criticalStock.map(product => (

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

                ))}

              </ul>

            )}

          </div>

        </div>

      </div>

    </main>
  )
}

export default AdminDashboard