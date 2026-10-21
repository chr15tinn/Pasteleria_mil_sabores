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

  const [searchParams] = useSearchParams()

  const categoriaUrl =
    searchParams.get('categoria')

  const { addToCart } = useCart()


  useEffect(() => {

    const data =
      productRepository.getAll()

    setProducts(data)

  }, [])


  // Si llegamos desde la página Categorías,
  // seleccionamos automáticamente esa categoría.
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