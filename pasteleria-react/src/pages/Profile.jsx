import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Profile() {

  const {
    user,
    login,
    isAuthenticated
  } = useAuth()

  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    telefono: user?.telefono || '',
    direccion: user?.direccion || ''
  })

  const [message, setMessage] = useState('')

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

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

    const updatedUser = {
      ...user,
      nombre: form.nombre,
      telefono: form.telefono,
      direccion: form.direccion
    }

    const users =
      JSON.parse(
        localStorage.getItem('usuarios')
      ) || []

    const updatedUsers =
      users.map(item =>
        item.id === user.id
          ? updatedUser
          : item
      )

    localStorage.setItem(
      'usuarios',
      JSON.stringify(updatedUsers)
    )

    login(updatedUser)

    setMessage(
      '✅ Perfil actualizado correctamente.'
    )
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
          👤 Mi Perfil
        </h1>

        {message && (
          <div className="alert alert-success">
            {message}
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
              className="form-control"
              value={user.email}
              disabled
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Tipo de usuario
            </label>

            <input
              className="form-control"
              value={user.role || 'CLIENTE'}
              disabled
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Fecha de nacimiento
            </label>

            <input
              type="date"
              className="form-control"
              value={user.fechaNacimiento || ''}
              disabled
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Teléfono
            </label>

            <input
              className="form-control"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
            />

          </div>

          <div className="mb-4">

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

          <button
            type="submit"
            className="btn btn-dark w-100"
          >
            Guardar cambios
          </button>

        </form>

        {user.beneficios && (

          <div className="mt-4">

            <hr />

            <h5>
              Beneficios de tu cuenta
            </h5>

            <p>
              <strong>Descuento:</strong>{' '}
              {user.beneficios.descuentoAplicable || 0}%
            </p>

            {user.beneficios.motivoDescuento && (
              <p>
                {user.beneficios.motivoDescuento}
              </p>
            )}

            {user.beneficios.esEstudianteDuoc && (
              <div className="alert alert-info">
                🎓 Correo Duoc verificado.
              </div>
            )}

          </div>

        )}

      </div>

    </main>
  )
}

export default Profile