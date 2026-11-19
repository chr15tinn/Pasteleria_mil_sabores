import { useEffect, useState } from 'react'

import { apiRequest } from '../services/api'
import { useAuth } from '../context/AuthContext'

function AdminUsers() {

  const [users, setUsers] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [message, setMessage] =
    useState('')

  const { user: currentUser } =
    useAuth()


  async function loadUsers() {

    try {

      setLoading(true)
      setMessage('')

      const data =
        await apiRequest(
          '/usuarios'
        )

      setUsers(data)

    } catch (error) {

      console.error(
        'Error al cargar usuarios:',
        error
      )

      setMessage(
        'No fue posible cargar los usuarios.'
      )

    } finally {

      setLoading(false)
    }
  }


  useEffect(() => {

    loadUsers()

  }, [])


  async function cambiarRol(
    usuario,
    nuevoRol
  ) {

    if (
      usuario.email ===
      currentUser?.email
    ) {

      alert(
        'No puedes modificar tu propio rol mientras estás conectado.'
      )

      return
    }


    try {

      setMessage('')


      const updatedUser = {

        nombre:
          usuario.nombre,

        email:
          usuario.email,

        password:
          '',

        rol:
          nuevoRol,

        telefono:
          usuario.telefono || ''
      }


      await apiRequest(
        `/usuarios/${usuario.id}`,
        {
          method: 'PUT',

          body:
            JSON.stringify(
              updatedUser
            )
        }
      )


      setUsers(current =>
        current.map(item =>
          item.id === usuario.id
            ? {
                ...item,
                rol: nuevoRol
              }
            : item
        )
      )


      setMessage(
        '✅ Rol actualizado correctamente.'
      )

    } catch (error) {

      console.error(
        'Error al cambiar rol:',
        error
      )


      if (
        error.status === 403
      ) {

        setMessage(
          'No tienes permiso para modificar usuarios.'
        )

        return
      }


      setMessage(
        'No fue posible actualizar el rol.'
      )
    }
  }


  async function eliminarUsuario(
    usuario
  ) {

    if (
      usuario.email ===
      currentUser?.email
    ) {

      alert(
        'No puedes eliminar tu propia cuenta mientras estás conectado.'
      )

      return
    }


    const confirmed =
      window.confirm(
        `¿Seguro que quieres eliminar a ${usuario.nombre}?`
      )


    if (!confirmed) {
      return
    }


    try {

      setMessage('')


      await apiRequest(
        `/usuarios/${usuario.id}`,
        {
          method: 'DELETE'
        }
      )


      setUsers(current =>
        current.filter(
          item =>
            item.id !== usuario.id
        )
      )


      setMessage(
        '✅ Usuario eliminado correctamente.'
      )

    } catch (error) {

      console.error(
        'Error al eliminar usuario:',
        error
      )


      if (
        error.status === 403
      ) {

        setMessage(
          'No tienes permiso para eliminar usuarios.'
        )

        return
      }


      setMessage(
        'No fue posible eliminar el usuario.'
      )
    }
  }


  if (loading) {

    return (

      <main className="container py-5">

        <p className="text-center">
          Cargando usuarios...
        </p>

      </main>
    )
  }


  return (

    <main className="container py-5">

      <h1
        className="mb-4"
        style={{
          color: '#8B4513'
        }}
      >
        👥 Gestión de usuarios
      </h1>


      {message && (

        <div className="alert alert-info">

          {message}

        </div>

      )}


      {users.length === 0 ? (

        <div className="alert alert-warning text-center">

          No existen usuarios registrados.

        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered align-middle">

            <thead>

              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>

            </thead>


            <tbody>

              {users.map(usuario => (

                <tr key={usuario.id}>

                  <td>
                    {usuario.id}
                  </td>


                  <td>
                    {usuario.nombre}
                  </td>


                  <td>

                    {usuario.email}

                    {usuario.email ===
                      currentUser?.email && (

                      <span className="badge bg-success ms-2">
                        Tú
                      </span>

                    )}

                  </td>


                  <td>
                    {usuario.telefono || '-'}
                  </td>


                  <td>

                    <select
                      className="form-select"
                      value={
                        usuario.rol ||
                        'CLIENTE'
                      }
                      disabled={
                        usuario.email ===
                        currentUser?.email
                      }
                      onChange={event =>
                        cambiarRol(
                          usuario,
                          event.target.value
                        )
                      }
                    >

                      <option value="CLIENTE">
                        CLIENTE
                      </option>

                      <option value="VENDEDOR">
                        VENDEDOR
                      </option>

                      <option value="ADMIN">
                        ADMIN
                      </option>

                    </select>

                  </td>


                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      disabled={
                        usuario.email ===
                        currentUser?.email
                      }
                      onClick={() =>
                        eliminarUsuario(
                          usuario
                        )
                      }
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </main>
  )
}

export default AdminUsers