import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ProductGrid from '../components/organisms/ProductGrid'
import SearchBar from '../components/molecules/SearchBar'
import { productRepository } from '../repositories/productRepository'
import { useCart } from '../context/CartContext'

function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams] = useSearchParams()

  const categoriaUrl =
    searchParams.get('categoria')

  const { addToCart } = useCart()


  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError('')

        const data =
          await productRepository.getAll()

        const adaptedProducts =
          data.map(product => ({
            id: product.id,

            name:
              product.nombre,

            description:
              product.descripcion || '',

            price:
              Number(product.precio),

            stock:
              product.stock,

            image:
              product.imagen,

            offer:
              product.oferta,

            category:
              product.categoria?.nombre || 'Sin categoría',

            categoryId:
              product.categoria?.id,
          }))

        setProducts(adaptedProducts)

      } catch (error) {
        console.error(
          'Error al cargar productos:',
          error
        )

        setError(
          'No fue posible cargar los productos.'
        )

      } finally {
        setLoading(false)
      }
    }

    loadProducts()

  }, [])


  useEffect(() => {
    if (categoriaUrl) {
      setCategory(categoriaUrl)
    } else {
      setCategory('Todas')
    }

  }, [categoriaUrl])


  function handleAddToCart(product) {
    addToCart(product)

    alert(
      `${product.name} fue agregado al carrito`
    )
  }


  const categories = [
    'Todas',
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ]


  const filteredProducts =
    products.filter(product => {

      const text =
        search
          .toLowerCase()
          .trim()

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(text) ||

        product.description
          .toLowerCase()
          .includes(text) ||

        product.category
          .toLowerCase()
          .includes(text)


      const matchesCategory =
        category === 'Todas' ||
        product.category === category


      return (
        matchesSearch &&
        matchesCategory
      )
    })


  if (loading) {
    return (
      <main className="container py-5">
        <div className="text-center">
          <p>
            Cargando productos...
          </p>
        </div>
      </main>
    )
  }


  return (
    <main className="container py-5">

      <div className="text-center mb-5">

        <div className="mb-4">

          <h1 className="titulo-principal">
            Nuestros Productos
          </h1>

          <p className="subtitulo-seccion">
            Descubre nuestro catálogo de tortas
            y productos de repostería.
          </p>

        </div>

      </div>


      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}


      <div className="row mb-4">

        <div className="col-md-8">

          <SearchBar
            search={search}
            onSearchChange={setSearch}
          />

        </div>


        <div className="col-md-4">

          <label
            htmlFor="categoryFilter"
            className="form-label fw-bold"
          >
            Categoría
          </label>

          <select
            id="categoryFilter"
            className="form-select"
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value
              )
            }
          >

            {categories.map(cat => (

              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>

            ))}

          </select>

        </div>

      </div>


      {categoriaUrl && (

        <div className="alert alert-info">

          Mostrando productos de:

          {' '}

          <strong>
            {categoriaUrl}
          </strong>

        </div>

      )}


      <p className="mb-4">

        Productos encontrados:

        <strong>
          {' '}
          {filteredProducts.length}
        </strong>

      </p>


      <ProductGrid
        products={filteredProducts}
        onAddToCart={handleAddToCart}
      />

    </main>
  )
}

export default Products