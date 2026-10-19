function Home() {
  return (
    <main>

      <section className="container py-5 text-center">

        <h1
          className="mb-3"
          style={{ color: '#8B4513' }}
        >
          Pastelería 1000 Sabores
        </h1>

        <p
          className="lead"
          style={{ color: '#5D4037' }}
        >
          Celebra la dulzura de la vida con nuestros productos,
          recetas tradicionales y sabores para cada ocasión.
        </p>

      </section>


      <section className="container pb-5">

        <div className="text-center mb-4">

          <h2
            style={{ color: '#8B4513' }}
          >
            Conoce nuestra Pastelería
          </h2>

          <p style={{ color: '#5D4037' }}>
            Descubre la tradición y el sabor de Pastelería 1000 Sabores.
          </p>

        </div>


        <div className="ratio ratio-16x9 shadow rounded overflow-hidden">

          <iframe
            src="https://www.youtube.com/embed/hhTViq_nPzM"
            title="Video Pastelería 1000 Sabores"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe>

        </div>

      </section>


      <section className="container py-5">

        <h2
          className="text-center mb-4"
          style={{ color: '#8B4513' }}
        >
          ¿Por qué elegirnos?
        </h2>


        <div className="row g-4">

          <div className="col-md-4">

            <div className="card h-100 shadow-sm text-center">

              <div className="card-body">

                <h4>
                  🎂 Productos artesanales
                </h4>

                <p>
                  Tortas y productos de repostería preparados para
                  distintas celebraciones y ocasiones especiales.
                </p>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card h-100 shadow-sm text-center">

              <div className="card-body">

                <h4>
                  🎁 Beneficios especiales
                </h4>

                <p>
                  Descuentos para clientes registrados y promociones
                  especiales disponibles en nuestra tienda.
                </p>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <div className="card h-100 shadow-sm text-center">

              <div className="card-body">

                <h4>
                  🚚 Compra online
                </h4>

                <p>
                  Compra desde nuestra tienda, selecciona tu fecha
                  de entrega y revisa el estado de tu pedido.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Home