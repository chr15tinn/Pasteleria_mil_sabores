import { useEffect, useState } from 'react'

import ProductGrid from '../components/organisms/ProductGrid'
import { productRepository } from '../repositories/productRepository'
import { useCart } from '../context/CartContext'

function Offers() {

  const [products, setProducts] =
    useState([])

  const { addToCart } =
    useCart()


  useEffect(() => {

    const data =
      productRepository
        .getAll()
        .filter(
          product =>
            product.offer === true
        )

    setProducts(data)

  }, [])


  function handleAddToCart(product) {

    addToCart(product)

    alert(
      `${product.name} fue agregado al carrito`
    )
  }


  return (

    <main className="container py-5">

      <div className="text-center mb-5">

        <h1
          style={{
            color: '#8B4513'
          }}
        >
          🎁 Ofertas
        </h1>

        <p>
          Revisa los productos que actualmente
          tienen promociones especiales.
        </p>

      </div>


      {products.length === 0 ? (

        <div className="alert alert-info text-center">

          Actualmente no existen productos
          en oferta.

        </div>

      ) : (

        <ProductGrid
          products={products}
          onAddToCart={
            handleAddToCart
          }
        />

      )}

    </main>
  )
}

export default Offers