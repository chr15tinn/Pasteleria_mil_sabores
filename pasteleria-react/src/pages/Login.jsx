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


function Login() {

  const navigate =
    useNavigate()

  const { login } =
    useAuth()


  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [message, setMessage] =
    useState('')


  function handleSubmit(event) {

    event.preventDefault()

    const result =
      authService.authenticate(
        email,
        password
      )


    if (!result.success) {

      setMessage(
        result.message
      )

      return
    }


    login(result.user)

    navigate('/')
  }


  return (

    <main className="container py-5">

      <div
        className="card shadow-sm p-4 mx-auto"
        style={{
          maxWidth: '500px'
        }}
      >

        <h1
          className="text-center mb-4"
          style={{
            color: '#8B4513'
          }}
        >
          Iniciar sesión
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
              Correo
            </label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={event =>
                setEmail(
                  event.target.value
                )
              }
              required
            />

          </div>


          <div className="mb-4">

            <label
              className="form-label"
            >
              Contraseña
            </label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={event =>
                setPassword(
                  event.target.value
                )
              }
              required
            />

          </div>


          <button
            type="submit"
            className="btn btn-dark w-100"
          >
            Ingresar
          </button>

        </form>

      </div>

    </main>
  )
}

export default Login