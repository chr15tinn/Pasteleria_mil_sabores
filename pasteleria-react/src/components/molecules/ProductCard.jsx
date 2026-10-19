import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import Price from '../atoms/Price'

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card h-100 shadow-sm">

      {product.image && (
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{
            height: '220px',
            objectFit: 'cover'
          }}
        />
      )}

      <div className="card-body d-flex flex-column">

        <span className="badge bg-secondary mb-2 align-self-start">
          {product.category}
        </span>

        <h5 className="card-title">
          {product.name}
        </h5>

        <p className="card-text">
          {product.description}
        </p>

        <div className="mt-auto">

          <p className="mb-2">
            <Price value={product.price} />
          </p>

          <p className="small text-muted">
            Stock: {product.stock}
          </p>

            <div className="d-grid gap-2">

            <Link
                to={`/productos/${product.id}`}
                className="btn btn-outline-dark"
            >
                Ver detalle
            </Link>

            <Button
                className="btn btn-dark"
                onClick={() => onAddToCart(product)}
            >
                Agregar al carrito
            </Button>

            </div>

        </div>

      </div>

    </div>
  )
}

export default ProductCard