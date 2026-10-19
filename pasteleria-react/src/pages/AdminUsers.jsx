import { useState } from 'react'

function AdminUsers() {

  const [users, setUsers] =
    useState(
      () =>
        JSON.parse(
          localStorage.getItem(
            'usuarios'
          )
        ) || []
    )


  function cambiarRol(
    id,
    nuevoRol
  ) {

    const updatedUsers =
      users.map(user =>
        user.id === id
          ? {
              ...user,
              role: nuevoRol
            }
          : user
      )


    setUsers(updatedUsers)


    localStorage.setItem(
      'usuarios',
      JSON.stringify(
        updatedUsers
      )
    )
  }


  function eliminarUsuario(id) {

    const confirmed =
      window.confirm(
        '¿Seguro que quieres eliminar este usuario?'
      )

    if (!confirmed) {
      return
    }


    const updatedUsers =
      users.filter(
        user => user.id !== id
      )


    setUsers(updatedUsers)


    localStorage.setItem(
      'usuarios',
      JSON.stringify(
        updatedUsers
      )
    )
  }


  if (users.length === 0) {

    return (
      <main className="container py-5">

        <div className="alert alert-warning text-center">
          No existen usuarios registrados.
        </div>

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


      <div className="table-responsive">

        <table className="table table-bordered align-middle">

          <thead>

            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Descuento</th>
              <th>Acciones</th>
            </tr>

          </thead>


          <tbody>

            {users.map(user => (

              <tr key={user.id}>

                <td>
                  {user.nombre}
                </td>

                <td>
                  {user.email}
                </td>

                <td>

                  <select
                    className="form-select"
                    value={
                      user.role ||
                      'CLIENTE'
                    }
                    onChange={event =>
                      cambiarRol(
                        user.id,
                        event.target.value
                      )
                    }
                  >

                    <option value="CLIENTE">
                      CLIENTE
                    </option>

                    <option value="ADMIN">
                      ADMIN
                    </option>

                  </select>

                </td>

                <td>

                  {
                    user.beneficios
                      ?.descuentoAplicable ||
                    0
                  }%

                </td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      eliminarUsuario(
                        user.id
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

    </main>
  )
}

export default AdminUsers