import { useEffect, useState } from 'react'
import {
  Link,
  useParams
} from 'react-router-dom'

import { productRepository } from '../repositories/productRepository'
import { useCart } from '../context/CartContext'
import Price from '../components/atoms/Price'

function ProductDetail() {

  const { id } =
    useParams()

  const { addToCart } =
    useCart()

  const [product, setProduct] =
    useState(null)

  const [loading, setLoading] =
    useState(true)


  useEffect(() => {

    const foundProduct =
      productRepository.getById(id)

    setProduct(foundProduct || null)
    setLoading(false)

  }, [id])


  function handleAddToCart() {

    if (!addToCart(product)) return

    alert(
      `${product.name} fue agregado al carrito`
    )
  }


  if (loading) {

    return (
      <main className="container py-5">

        <p className="text-center">
          Cargando producto...
        </p>

      </main>
    )
  }


  if (!product) {

    return (
      <main className="container py-5">

        <div className="alert alert-danger text-center">

          No se encontró el producto solicitado.

        </div>

        <div className="text-center">

          <Link
            to="/productos"
            className="btn btn-dark"
          >
            Volver a productos
          </Link>

        </div>

      </main>
    )
  }


  return (

    <main className="container py-5">

      <div className="row g-5 align-items-center">

        <div className="col-lg-6">

          {product.image ? (

            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow-sm"
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover'
              }}
            />

          ) : (

            <div
              className="bg-light rounded d-flex align-items-center justify-content-center"
              style={{
                minHeight: '400px'
              }}
            >
              Sin imagen
            </div>

          )}

        </div>


        <div className="col-lg-6">

          <span className="badge bg-secondary mb-3">
            {product.category}
          </span>


          <h1
            className="mb-3"
            style={{
              color: '#8B4513'
            }}
          >
            {product.name}
          </h1>


          <p className="lead">
            {product.description}
          </p>


          <div className="mb-3">

            <strong>
              Precio:
            </strong>

            {' '}

            <Price
              value={product.price}
            />

          </div>


          <p>
            <strong>
              Stock disponible:
            </strong>

            {' '}

            {product.stock}
          </p>


          {product.offer && (

            <div className="alert alert-success">

              🎁 Este producto se encuentra actualmente en oferta.

            </div>

          )}


          {product.name
            .toLowerCase()
            .includes('torta') && (

            <div className="alert alert-info">

              🎂 Este producto puede personalizarse
              con un mensaje especial al realizar
              la compra.

            </div>

          )}


          <div className="d-flex gap-2 flex-wrap mt-4">

            <button
              className="btn btn-dark"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >

              {product.stock > 0
                ? 'Agregar al carrito'
                : 'Sin stock'}

            </button>


            <Link
              to="/productos"
              className="btn btn-outline-dark"
            >
              Volver
            </Link>

          </div>

        </div>

      </div>

    </main>
  )
}

export default ProductDetail
