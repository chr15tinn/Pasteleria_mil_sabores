import {
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import {
  authService
} from '../services/authService'

import {
  useAuth
} from '../context/AuthContext'


function Register() {

  const navigate =
    useNavigate()

  const { login } =
    useAuth()


  const [form, setForm] =
    useState({

      nombre: '',
      email: '',
      password: '',
      fechaNacimiento: '',
      telefono: '',
      direccion: '',
      codigoPromocional: ''

    })


  const [message, setMessage] =
    useState('')


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


  function handleSubmit(event) {

    event.preventDefault()

    const result =
      authService.register(form)


    if (!result.success) {

      setMessage(
        result.message
      )

      return
    }


    login(result.user)

    alert(
      '✅ Usuario registrado correctamente.'
    )

    navigate('/')
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

            <label
              className="form-label"
            >
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

            <label
              className="form-label"
            >
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

            <label
              className="form-label"
            >
              Contraseña
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>


          <div className="mb-3">

            <label
              className="form-label"
            >
              Fecha de nacimiento
            </label>

            <input
              type="date"
              className="form-control"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              required
            />

          </div>


          <div className="mb-3">

            <label
              className="form-label"
            >
              Teléfono
            </label>

            <input
              className="form-control"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
            />

          </div>


          <div className="mb-3">

            <label
              className="form-label"
            >
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

            <label
              className="form-label"
            >
              Código promocional
            </label>

            <input
              className="form-control"
              name="codigoPromocional"
              value={
                form.codigoPromocional
              }
              onChange={handleChange}
              placeholder="Ej: FELICES50"
            />

          </div>


          <button
            className="btn btn-dark w-100"
            type="submit"
          >
            Registrarme
          </button>

        </form>

      </div>

    </main>
  )
}

export default Register