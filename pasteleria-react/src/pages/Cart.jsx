import { Link } from 'react-router-dom'

import CartItem from '../components/molecules/CartItem'
import { useCart } from '../context/CartContext'

function Cart() {

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal
  } = useCart()

  const neto =
  subtotal / 1.19

  const iva =
  subtotal - neto


  if (cart.length === 0) {

    return (

      <main className="container py-5">

        <div
          className="alert alert-warning text-center"
        >

          Tu carrito está vacío.

        </div>

        <div className="text-center">

          <Link
            to="/productos"
            className="btn btn-dark"
          >
            Ver productos
          </Link>

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
        🛒 Carrito de compras
      </h1>


      <div className="table-responsive">

        <table className="table table-bordered align-middle">

          <thead>

            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>

          </thead>


          <tbody>

            {cart.map(item => (

              <CartItem
                key={item.id}
                item={item}
                onRemove={
                  removeFromCart
                }
                onQuantityChange={
                  updateQuantity
                }
              />

            ))}

          </tbody>

        </table>

      </div>


<div className="card shadow-sm mt-4">

  <div className="card-body">

    <h4 className="mb-3">
      Resumen de compra
    </h4>


    <div className="d-flex justify-content-between mb-2">

      <span>
        Neto
      </span>

      <strong>
        $
        {Math.round(neto)
          .toLocaleString('es-CL')}
      </strong>

    </div>


    <div className="d-flex justify-content-between mb-2">

      <span>
        IVA (19%)
      </span>

      <strong>
        $
        {Math.round(iva)
          .toLocaleString('es-CL')}
      </strong>

    </div>


    <hr />


    <div className="d-flex justify-content-between">

      <span className="fw-bold">
        Total
      </span>

      <strong
        style={{
          color: '#8B4513',
          fontSize: '1.3rem'
        }}
      >
        $
        {Math.round(subtotal)
          .toLocaleString('es-CL')}
      </strong>

    </div>


    <p className="text-muted small mt-2 mb-0">
      Los precios incluyen IVA.
    </p>

  </div>

</div>


      <div
        className="d-flex justify-content-between mt-4"
      >

        <button
          className="btn btn-outline-danger"
          onClick={clearCart}
        >
          Vaciar carrito
        </button>


        <Link
          to="/checkout"
          className="btn btn-dark"
        >
          Continuar compra
        </Link>

      </div>

    </main>
  )
}

export default Cart