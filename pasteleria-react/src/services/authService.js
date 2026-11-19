import { apiRequest } from './api'

const USER_KEY = 'usuario'
const TOKEN_KEY = 'token'


async function authenticate(
  email,
  password
) {

  try {

    const response =
      await apiRequest(
        '/auth/login',
        {
          method: 'POST',

          body: JSON.stringify({
            email,
            password
          })
        }
      )


    const user = {
      id: response.id,
      nombre: response.nombre,
      email: response.email,
      role: response.rol,
      telefono: response.telefono
    }


    localStorage.setItem(
      TOKEN_KEY,
      response.token
    )

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    )


    return {
      success: true,
      user,
      token: response.token
    }

  } catch (error) {

    return {
      success: false,
      message:
        'Correo o contraseña incorrectos.'
    }
  }
}


async function register(form) {

  try {

    const response =
      await apiRequest(
        '/auth/register',
        {
          method: 'POST',

          body: JSON.stringify({
            nombre: form.nombre,
            email: form.email,
            password: form.password,
            telefono: form.telefono
          })
        }
      )


    return {
      success: true,
      user: response
    }

  } catch (error) {

    if (error.status === 409) {

      return {
        success: false,
        message:
          'Ese correo ya se encuentra registrado.'
      }
    }


    if (error.status === 400) {

      return {
        success: false,
        message:
          'Debes usar un correo institucional Duoc válido.'
      }
    }


    return {
      success: false,
      message:
        'No fue posible crear la cuenta.'
    }
  }
}


function logout() {

  localStorage.removeItem(
    TOKEN_KEY
  )

  localStorage.removeItem(
    USER_KEY
  )
}


function getCurrentUser() {

  const storedUser =
    localStorage.getItem(
      USER_KEY
    )


  if (!storedUser) {
    return null
  }


  try {

    return JSON.parse(
      storedUser
    )

  } catch {

    return null
  }
}


function getToken() {

  return localStorage.getItem(
    TOKEN_KEY
  )
}


function isAuthenticated() {

  return Boolean(
    getToken() &&
    getCurrentUser()
  )
}


export const authService = {

  authenticate,
  register,
  logout,
  getCurrentUser,
  getToken,
  isAuthenticated
}