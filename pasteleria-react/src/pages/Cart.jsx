import { Link } from 'react-router-dom'

import CartItem from '../components/molecules/CartItem'
import Price from '../components/atoms/Price'
import { useCart } from '../context/CartContext'

function Cart() {

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal
  } = useCart()


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


      <div className="text-end">

        <h4>

          Total:

          {' '}

          <Price
            value={subtotal}
          />

        </h4>

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