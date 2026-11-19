import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()

  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')
    setLoading(true)

    const result = await login(
      email,
      password
    )

    setLoading(false)

    if (!result.success) {
      setMessage(result.message)
      return
    }

    const role = result.user?.role

    if (role === 'ADMIN') {
      navigate('/admin')
      return
    }

    if (role === 'VENDEDOR') {
      navigate('/productos')
      return
    }

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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Correo
            </label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Contraseña
            </label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading
              ? 'Ingresando...'
              : 'Ingresar'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login