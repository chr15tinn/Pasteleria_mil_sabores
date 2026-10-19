import { useState } from 'react'

function Contact() {

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })

  const [sent, setSent] = useState(false)


  function handleChange(event) {

    const {
      name,
      value
    } = event.target

    setForm(current => ({
      ...current,
      [name]: value
    }))

    setSent(false)
  }


  function handleSubmit(event) {

    event.preventDefault()

    const mensajes =
      JSON.parse(
        localStorage.getItem('mensajesContacto')
      ) || []

    const nuevoMensaje = {
      id: Date.now(),
      ...form,
      fecha:
        new Date()
          .toLocaleString('es-CL')
    }

    mensajes.push(nuevoMensaje)

    localStorage.setItem(
      'mensajesContacto',
      JSON.stringify(mensajes)
    )

    setSent(true)

    setForm({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    })
  }


  return (
    <main className="container py-5">

      <div className="text-center mb-5">

        <h1 style={{ color: '#8B4513' }}>
          Contacto
        </h1>

        <p>
          Si tienes dudas o consultas, envíanos un mensaje.
        </p>

      </div>


      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow-sm p-4">

            {sent && (
              <div className="alert alert-success">
                ✅ Tu mensaje fue enviado correctamente.
              </div>
            )}


            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label">
                  Nombre
                </label>

                <input
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="mb-3">

                <label className="form-label">
                  Correo
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="mb-3">

                <label className="form-label">
                  Asunto
                </label>

                <input
                  className="form-control"
                  name="asunto"
                  value={form.asunto}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="mb-4">

                <label className="form-label">
                  Mensaje
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                />

              </div>


              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Enviar mensaje
              </button>

            </form>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Contact