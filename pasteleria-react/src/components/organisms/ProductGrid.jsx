import ProductCard from '../molecules/ProductCard'

function ProductGrid({
  products,
  onAddToCart
}) {
  if (products.length === 0) {
    return (
      <div className="alert alert-warning text-center">
        No se encontraron productos.
      </div>
    )
  }

  return (
    <div className="row g-4">

      {products.map(product => (

        <div
          className="col-12 col-sm-6 col-lg-4 col-xl-3"
          key={product.id}
        >

          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
          />

        </div>

      ))}

    </div>
  )
}

export default ProductGrid