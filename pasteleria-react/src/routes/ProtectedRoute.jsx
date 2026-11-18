import { Navigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'


function ProtectedRoute({
  children,
  allowedRoles
}) {

  const {
    user,
    isAuthenticated
  } = useAuth()


  /*
    Si no existe sesión,
    enviamos al login.
  */

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }


  /*
    Si la ruta no define roles,
    basta con estar autenticado.
  */

  if (
    !allowedRoles ||
    allowedRoles.length === 0
  ) {

    return children
  }


  /*
    Verificamos si el rol
    tiene permiso para entrar.
  */

  if (
    !allowedRoles.includes(
      user?.role
    )
  ) {

    /*
      Cada rol vuelve a una
      página permitida.
    */

    if (
      user?.role === 'VENDEDOR'
    ) {

      return (
        <Navigate
          to="/productos"
          replace
        />
      )
    }


    if (
      user?.role === 'ADMIN'
    ) {

      return (
        <Navigate
          to="/admin"
          replace
        />
      )
    }


    /*
      CLIENTE
    */

    return (
      <Navigate
        to="/"
        replace
      />
    )
  }


  return children
}


export default ProtectedRoute