import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { productRepository } from '../repositories/productRepository'

function Categories() {

  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  useEffect(() => {

    const data =
      productRepository.getAll()

    setProducts(data)

  }, [])


  const categories = [
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ]


  function verCategoria(category) {

    navigate(
      `/productos?categoria=${encodeURIComponent(category)}`
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
          Categorías
        </h1>

        <p>
          Explora nuestros productos según
          el tipo de repostería que prefieras.
        </p>

      </div>


      <div className="row g-4">

        {categories.map(category => {

          const cantidad =
            products.filter(
              product =>
                product.category === category
            ).length


          return (

            <div
              className="col-12 col-sm-6 col-lg-4"
              key={category}
            >

              <div className="card h-100 shadow-sm text-center">

                <div className="card-body">

                  <h4
                    style={{
                      color: '#8B4513'
                    }}
                  >
                    {category}
                  </h4>

                  <p>
                    {cantidad}
                    {' '}
                    producto
                    {cantidad !== 1 ? 's' : ''}
                  </p>

                  <button
                    className="btn btn-dark"
                    onClick={() =>
                      verCategoria(category)
                    }
                  >
                    Ver productos
                  </button>

                </div>

              </div>

            </div>

          )

        })}

      </div>

    </main>
  )
}

export default Categories