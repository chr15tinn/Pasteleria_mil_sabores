import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { authService } from '../services/authService'


function Register() {

  const navigate = useNavigate()

  const [form, setForm] =
    useState({
      nombre: '',
      email: '',
      password: '',
      telefono: '',
      direccion: '',
      codigoPromocional: ''
    })

  const [message, setMessage] =
    useState('')

  const [loading, setLoading] =
    useState(false)


  function handleChange(event) {

    const {
      name,
      value
    } = event.target

    setForm(current => ({
      ...current,
      [name]: value
    }))
  }


  async function handleSubmit(event) {

    event.preventDefault()

    setMessage('')


    try {

      setLoading(true)

      const result =
        await authService.register(form)


      if (!result.success) {

        setMessage(
          result.message
        )

        return
      }


      alert(
        '✅ Usuario registrado correctamente. Ahora puedes iniciar sesión.'
      )

      navigate('/login')

    } catch (error) {

      console.error(
        'Error al registrar usuario:',
        error
      )

      setMessage(
        'No fue posible crear la cuenta.'
      )

    } finally {

      setLoading(false)
    }
  }


  return (

    <main className="container py-5">

      <div
        className="card shadow-sm p-4 mx-auto"
        style={{
          maxWidth: '650px'
        }}
      >

        <h1
          className="text-center mb-4"
          style={{
            color: '#8B4513'
          }}
        >
          Crear cuenta
        </h1>


        {message && (

          <div className="alert alert-danger">

            {message}

          </div>

        )}


        <form
          onSubmit={handleSubmit}
        >

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
              Correo institucional
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ejemplo@duocuc.cl"
              required
            />

            <small className="text-muted">
              Se permiten correos Duoc.
            </small>

          </div>


          <div className="mb-3">

            <label className="form-label">
              Contraseña
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              minLength="6"
              required
            />

          </div>


          <div className="mb-3">

            <label className="form-label">
              Teléfono
            </label>

            <input
              type="tel"
              className="form-control"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ej: 912345678"
            />

          </div>


          <div className="mb-3">

            <label className="form-label">
              Dirección
            </label>

            <input
              className="form-control"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
            />

          </div>


          <div className="mb-4">

            <label className="form-label">
              Código promocional
            </label>

            <input
              className="form-control"
              name="codigoPromocional"
              value={form.codigoPromocional}
              onChange={handleChange}
              placeholder="Ej: FELICES50"
            />

          </div>


          <button
            className="btn btn-dark w-100"
            type="submit"
            disabled={loading}
          >

            {loading
              ? 'Creando cuenta...'
              : 'Registrarme'}

          </button>

        </form>

      </div>

    </main>
  )
}

export default Register