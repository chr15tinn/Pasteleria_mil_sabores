function About() {
  return (
    <main className="container py-5">

      <div className="text-center mb-5">
        <h1 style={{ color: '#8B4513' }}>
          Nosotros
        </h1>

        <p className="lead">
          Conoce la historia y el propósito de Pastelería 1000 Sabores.
        </p>
      </div>


      <div className="row g-4">

        <div className="col-md-6">
          <div className="card h-100 shadow-sm p-4">

            <h3 style={{ color: '#8B4513' }}>
              Nuestra historia
            </h3>

            <p>
              Pastelería 1000 Sabores cuenta con una larga trayectoria
              en la repostería chilena, destacándose por sus productos,
              recetas tradicionales y participación en celebraciones
              especiales.
            </p>

            <p>
              Nuestro objetivo es mantener la tradición de la pastelería
              y, al mismo tiempo, ofrecer una experiencia de compra
              moderna mediante nuestra tienda online.
            </p>

          </div>
        </div>


        <div className="col-md-6">
          <div className="card h-100 shadow-sm p-4">

            <h3 style={{ color: '#8B4513' }}>
              Nuestra misión
            </h3>

            <p>
              Ofrecer una experiencia dulce y memorable a nuestros
              clientes, proporcionando tortas y productos de repostería
              de calidad para diferentes ocasiones.
            </p>


            <h3
              className="mt-4"
              style={{ color: '#8B4513' }}
            >
              Nuestra visión
            </h3>

            <p>
              Convertirnos en una tienda online reconocida por la
              innovación, calidad y cercanía con nuestros clientes.
            </p>

          </div>
        </div>

      </div>


      <div className="card shadow-sm p-4 mt-4">

        <h3
          className="text-center"
          style={{ color: '#8B4513' }}
        >
          Nuestro compromiso
        </h3>

        <p className="text-center mb-0">
          Buscamos combinar tradición, creatividad y tecnología para
          entregar una experiencia sencilla y agradable a quienes
          visitan nuestra tienda.
        </p>

      </div>

    </main>
  )
}

export default About