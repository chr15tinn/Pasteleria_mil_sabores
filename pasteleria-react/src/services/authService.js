import { initialUsers } from '../data/users'

const USERS_KEY = 'usuarios'


function getUsers() {

  let users =
    JSON.parse(
      localStorage.getItem(USERS_KEY)
    ) || []

  const adminExists =
    users.some(
      user =>
        user.email ===
        'admin@1000sabores.cl'
    )

  if (!adminExists) {

    users = [
      ...initialUsers,
      ...users
    ]

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    )
  }

  return users
}


function calculateAge(
  birthDate
) {

  const today = new Date()
  const birth = new Date(birthDate)

  let age =
    today.getFullYear() -
    birth.getFullYear()

  const month =
    today.getMonth() -
    birth.getMonth()

  if (
    month < 0 ||
    (
      month === 0 &&
      today.getDate() <
      birth.getDate()
    )
  ) {
    age--
  }

  return age
}


function isBirthdayToday(
  birthDate
) {

  if (!birthDate) {
    return false
  }

  const today = new Date()
  const birth = new Date(
    birthDate + 'T00:00:00'
  )

  return (
    today.getDate() ===
      birth.getDate() &&

    today.getMonth() ===
      birth.getMonth()
  )
}

function isDuocEmail(email) {

  const normalized =
    email.toLowerCase().trim()

  return (
    normalized.endsWith('@duocuc.cl') ||
    normalized.endsWith('@duoc.cl') ||
    normalized.endsWith('@profesor.duocuc.cl') ||
    normalized.endsWith('@profesor.duoc.cl')
  )
}


function isAllowedEmailDomain(email) {

  const normalized =
    email.toLowerCase().trim()

  const allowedDomains = [
    '@duocuc.cl',
    '@duoc.cl',
    '@profesor.duocuc.cl',
    '@profesor.duoc.cl'
  ]

  return allowedDomains.some(
    domain =>
      normalized.endsWith(domain)
  )
}


function register(data) {

  const users = getUsers()

  const existingUser =
    users.find(
      user =>
        user.email.toLowerCase() ===
        data.email.toLowerCase()
    )

      if (
    !isAllowedEmailDomain(
      data.email
    )
  ) {

    return {
      success: false,
      message:
        'Solo se permiten correos institucionales Duoc.'
    }
  }

  if (existingUser) {

    return {
      success: false,
      message:
        'El correo ya se encuentra registrado.'
    }
  }


  const age =
    calculateAge(
      data.fechaNacimiento
    )

  const duoc =
    isDuocEmail(data.email)

  const birthday =
    isBirthdayToday(
      data.fechaNacimiento
    )


  let discount = 0
  let discountReason = null

  if (age > 50) {

    discount = 50
    discountReason =
      'Descuento mayor de 50 años'

  } else if (
    data.codigoPromocional
      ?.trim()
      .toUpperCase() ===
    'FELICES50'
  ) {

    discount = 10
    discountReason =
      'Descuento aniversario Pastelería 1000 Sabores - código FELICES50'
  }


  const newUser = {

    id: Date.now(),

    role: 'CLIENTE',

    nombre:
      data.nombre.trim(),

    email:
      data.email.trim(),

    password:
      data.password,

    fechaNacimiento:
      data.fechaNacimiento,

    telefono:
      data.telefono || '',

    direccion:
      data.direccion || '',

    beneficios: {

      descuentoAplicable:
        discount,

      motivoDescuento:
        discountReason,

      esEstudianteDuoc:
        duoc,

      tortaGratis:
        duoc && birthday

    }

  }


  users.push(newUser)

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  )


  return {
    success: true,
    user: newUser
  }
}


function authenticate(
  email,
  password
) {

  const users =
    getUsers()

  const user =
    users.find(
      item =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    )


  if (!user) {

    return {
      success: false,
      message:
        'Correo o contraseña incorrectos.'
    }
  }


    const authenticatedUser = {
    ...user,
    role: user.role || 'CLIENTE'
    }

    return {
    success: true,
    user: authenticatedUser
    }
}


export const authService = {
  register,
  authenticate,
  isDuocEmail,
  isAllowedEmailDomain,
  isBirthdayToday,
  calculateAge
}