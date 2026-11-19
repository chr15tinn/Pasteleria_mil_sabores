import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  productRepository
} from '../repositories/productRepository'


const CartContext = createContext()


export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

    const storedCart =
      localStorage.getItem('cart')

    return storedCart
      ? JSON.parse(storedCart)
      : []
  })


  /*
   * Guardar carrito cada vez
   * que cambie.
   */
  useEffect(() => {

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    )

  }, [cart])


  /*
   * Al iniciar la aplicación,
   * actualizamos precio y stock
   * usando los productos reales
   * del backend.
   */
  useEffect(() => {

    async function actualizarCarrito() {

      try {

        const productosBackend =
          await productRepository.getAll()


        setCart(currentCart =>
          currentCart
            .map(item => {

              const productoReal =
                productosBackend.find(
                  producto =>
                    Number(producto.id) ===
                    Number(item.id)
                )


              if (!productoReal) {
                return null
              }


              const stockReal =
                Number(
                  productoReal.stock || 0
                )


              return {
                ...item,

                name:
                  productoReal.nombre ||
                  item.name,

                price:
                  Number(
                    productoReal.precio ||
                    item.price ||
                    0
                  ),

                stock:
                  stockReal,

                quantity:
                  Math.min(
                    Number(
                      item.quantity || 1
                    ),
                    stockReal
                  )
              }
            })
            .filter(
              item =>
                item !== null &&
                item.stock > 0 &&
                item.quantity > 0
            )
        )

      } catch (error) {

        console.error(
          'No fue posible actualizar el carrito:',
          error
        )
      }
    }


    actualizarCarrito()

  }, [])


  function addToCart(product) {

    const stock =
      Number(
        product.stock || 0
      )


    const existente =
      cart.find(
        item =>
          Number(item.id) ===
          Number(product.id)
      )


    const cantidadActual =
      Number(
        existente?.quantity || 0
      )


    if (
      cantidadActual + 1 >
      stock
    ) {

      alert(
        `Stock insuficiente. Disponibles: ${Math.max(
          0,
          stock - cantidadActual
        )}`
      )

      return false
    }


    setCart(currentCart => {

      const existingProduct =
        currentCart.find(
          item =>
            Number(item.id) ===
            Number(product.id)
        )


      if (existingProduct) {

        return currentCart.map(
          item =>
            Number(item.id) ===
            Number(product.id)
              ? {
                  ...item,
                  stock,
                  quantity:
                    item.quantity + 1
                }
              : item
        )
      }


      return [
        ...currentCart,
        {
          ...product,
          stock,
          quantity: 1
        }
      ]
    })


    return true
  }


  function removeFromCart(id) {

    setCart(currentCart =>
      currentCart.filter(
        item =>
          Number(item.id) !==
          Number(id)
      )
    )
  }


  function updateQuantity(
    id,
    quantity
  ) {

    const nuevaCantidad =
      Number(quantity)


    if (
      !Number.isInteger(
        nuevaCantidad
      )
    ) {
      return
    }


    if (
      nuevaCantidad <= 0
    ) {

      removeFromCart(id)

      return
    }


    const item =
      cart.find(
        producto =>
          Number(producto.id) ===
          Number(id)
      )


    if (!item) {
      return
    }


    const stock =
      Number(
        item.stock || 0
      )


    if (
      nuevaCantidad > stock
    ) {

      alert(
        `Stock insuficiente. Stock disponible: ${stock}`
      )

      return
    }


    setCart(currentCart =>
      currentCart.map(
        producto =>
          Number(producto.id) ===
          Number(id)
            ? {
                ...producto,
                quantity:
                  nuevaCantidad
              }
            : producto
      )
    )
  }


  function clearCart() {

    setCart([])
  }


  const subtotal =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
        Number(item.quantity || 0),
      0
    )


  const totalItems =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    )


  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems
      }}
    >

      {children}

    </CartContext.Provider>

  )
}


export function useCart() {

  return useContext(
    CartContext
  )
}