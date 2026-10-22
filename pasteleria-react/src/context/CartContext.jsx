import {
  productRepository 
} from '../repositories/productRepository'

import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

    const storedCart =
      localStorage.getItem('cart')

    return storedCart
      ? JSON.parse(storedCart)
      : []
  })


  useEffect(() => {

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    )

  }, [cart])


 
function addToCart(product) {
  const productoActual = productRepository.getById(product.id)
  const stock = Number(productoActual?.stock ?? product.stock ?? 0)

  const existente = cart.find(item => item.id === product.id)
  const cantidadActual = existente?.quantity || 0

  if (cantidadActual + 1 > stock) {
    alert(`Stock insuficiente. Disponibles: ${Math.max(0, stock - cantidadActual)}`)
    return false
  }

  setCart(currentCart => {
    const existingProduct = currentCart.find(
      item => item.id === product.id
    )

    if (existingProduct) {
      return currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    }

    return [
      ...currentCart,
      { ...product, stock, quantity: 1 }
    ]
  })

  return true
}


  function removeFromCart(id) {

    setCart(currentCart =>
      currentCart.filter(
        item => item.id !== id
      )
    )
  }


 
function updateQuantity(id, quantity) {
  const nuevaCantidad = Number(quantity)

  if (nuevaCantidad <= 0) {
    removeFromCart(id)
    return
  }

  const producto = productRepository.getById(id)
  const stock = Number(producto?.stock ?? 0)

  if (!Number.isInteger(nuevaCantidad) || nuevaCantidad > stock) {
    alert(`Stock insuficiente. Stock disponible: ${stock}`)
    return
  }

  setCart(currentCart =>
    currentCart.map(item =>
      item.id === id
        ? { ...item, quantity: nuevaCantidad }
        : item
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
        item.price *
        item.quantity,
      0
    )


  const totalItems =
    cart.reduce(
      (total, item) =>
        total +
        item.quantity,
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
  return useContext(CartContext)
}
