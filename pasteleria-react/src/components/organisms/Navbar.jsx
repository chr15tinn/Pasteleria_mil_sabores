import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'


function Navbar() {

  const {
    user,
    logout,
    isAuthenticated
  } = useAuth()


  const {
    totalItems
  } = useCart()


  function handleLogout() {
    logout()
  }


  /*
    VISTA EXCLUSIVA VENDEDOR
  */

  if (
    isAuthenticated &&
    user?.role === 'VENDEDOR'
  ) {

    return (

      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: '#8B4513'
        }}
      >

        <div className="container">


          <Link
            className="navbar-brand fw-bold"
            to="/productos"
          >
            Pastelería 1000 Sabores
          </Link>


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarVendedor"
            aria-controls="navbarVendedor"
            aria-expanded="false"
            aria-label="Abrir menú"
          >

            <span className="navbar-toggler-icon"></span>

          </button>


          <div
            className="collapse navbar-collapse"
            id="navbarVendedor"
          >

            <ul className="navbar-nav ms-auto align-items-lg-center">


              <li className="nav-item">

                <Link
                  className="nav-link"
                  to="/productos"
                >
                  Productos
                </Link>

              </li>


              <li className="nav-item">

                <Link
                  className="nav-link"
                  to="/vendedor/ordenes"
                >
                  Órdenes
                </Link>

              </li>


              <li className="nav-item dropdown">

                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  👤 {user.nombre}
                </button>


                <ul className="dropdown-menu dropdown-menu-end">

                  <li>

                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>

                  </li>

                </ul>

              </li>

            </ul>

          </div>

        </div>

      </nav>
    )
  }


  /*
    NAVBAR NORMAL
    CLIENTE / ADMIN / VISITANTE
  */

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: '#8B4513'
      }}
    >

      <div className="container">


        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          Pastelería 1000 Sabores
        </Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPrincipal"
          aria-controls="navbarPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >

          <span className="navbar-toggler-icon"></span>

        </button>


        <div
          className="collapse navbar-collapse"
          id="navbarPrincipal"
        >

          <ul className="navbar-nav ms-auto align-items-lg-center">


            <li className="nav-item">

              <Link
                className="nav-link"
                to="/"
              >
                Inicio
              </Link>

            </li>


            <li className="nav-item dropdown">

              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  textDecoration: 'none'
                }}
              >
                Productos
              </button>


              <ul className="dropdown-menu">

                <li>

                  <Link
                    className="dropdown-item"
                    to="/productos"
                  >
                    Todos los productos
                  </Link>

                </li>


                <li>

                  <Link
                    className="dropdown-item"
                    to="/categorias"
                  >
                    Categorías
                  </Link>

                </li>


                <li>

                  <Link
                    className="dropdown-item"
                    to="/ofertas"
                  >
                    Ofertas
                  </Link>

                </li>

              </ul>

            </li>


            <li className="nav-item">

              <Link
                className="nav-link"
                to="/blog"
              >
                Blog
              </Link>

            </li>


            <li className="nav-item">

              <Link
                className="nav-link"
                to="/nosotros"
              >
                Nosotros
              </Link>

            </li>


            <li className="nav-item">

              <Link
                className="nav-link"
                to="/contacto"
              >
                Contacto
              </Link>

            </li>


            <li className="nav-item">

              <Link
                className="nav-link"
                to="/carrito"
              >
                🛒 Carrito ({totalItems})
              </Link>

            </li>


            {!isAuthenticated ? (

              <li className="nav-item dropdown">

                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  Cuenta
                </button>


                <ul className="dropdown-menu dropdown-menu-end">

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/login"
                    >
                      Iniciar sesión
                    </Link>

                  </li>


                  <li>

                    <Link
                      className="dropdown-item"
                      to="/registro"
                    >
                      Crear cuenta
                    </Link>

                  </li>

                </ul>

              </li>

            ) : (

              <li className="nav-item dropdown">

                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  👤 {user.nombre}
                </button>


                <ul className="dropdown-menu dropdown-menu-end">


                  <li>

                    <Link
                      className="dropdown-item"
                      to="/perfil"
                    >
                      Mi perfil
                    </Link>

                  </li>


                  <li>

                    <Link
                      className="dropdown-item"
                      to="/pedidos"
                    >
                      Mis pedidos
                    </Link>

                  </li>


                  {user?.role === 'ADMIN' && (

                    <>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>


                      <li>

                        <Link
                          className="dropdown-item"
                          to="/admin"
                        >
                          Administración
                        </Link>

                      </li>

                    </>

                  )}


                  <li>
                    <hr className="dropdown-divider" />
                  </li>


                  <li>

                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>

                  </li>

                </ul>

              </li>

            )}

          </ul>

        </div>

      </div>

    </nav>
  )
}


export default Navbar