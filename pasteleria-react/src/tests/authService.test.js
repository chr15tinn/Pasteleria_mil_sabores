import {
  beforeEach,
  describe,
  expect,
  it
} from 'vitest'

import {
  authService
} from '../services/authService'


describe('authService', () => {

  beforeEach(() => {
    localStorage.clear()
  })


  it('registra correctamente un nuevo usuario', () => {

    const nuevoUsuario = {
      nombre: 'Christian',
      email: 'christian@duocuc.cl',
      password: '123456',
      fechaNacimiento: '1995-05-10',
      telefono: '912345678',
      direccion: 'Santiago',
      codigoPromocional: ''
    }


    const resultado =
      authService.register(
        nuevoUsuario
      )


    expect(
      resultado.success
    ).toBe(true)


    expect(
      resultado.user.nombre
    ).toBe('Christian')


    expect(
      resultado.user.email
    ).toBe(
      'christian@duocuc.cl'
    )


    expect(
      resultado.user.role
    ).toBe('CLIENTE')

  })


  it('permite iniciar sesión con datos correctos', () => {

    authService.register({
      nombre: 'Christian',
      email: 'christian@duocuc.cl',
      password: '123456',
      fechaNacimiento: '1995-05-10',
      telefono: '',
      direccion: '',
      codigoPromocional: ''
    })


    const resultado =
      authService.authenticate(
        'christian@duocuc.cl',
        '123456'
      )


    expect(
      resultado.success
    ).toBe(true)


    expect(
      resultado.user
    ).toBeTruthy()


    expect(
      resultado.user.email
    ).toBe(
      'christian@duocuc.cl'
    )


    expect(
      resultado.user.role
    ).toBe('CLIENTE')

  })


  it('rechaza el inicio de sesión con contraseña incorrecta', () => {

    authService.register({
      nombre: 'Christian',
      email: 'christian@duocuc.cl',
      password: '123456',
      fechaNacimiento: '1995-05-10',
      telefono: '',
      direccion: '',
      codigoPromocional: ''
    })


    const resultado =
      authService.authenticate(
        'christian@duocuc.cl',
        'incorrecta'
      )


    expect(
      resultado.success
    ).toBe(false)


    expect(
      resultado.message
    ).toBe(
      'Correo o contraseña incorrectos.'
    )

  })


  it('rechaza registros con dominios no permitidos', () => {

    const resultado =
      authService.register({
        nombre: 'Christian',
        email: 'christian@gmail.com',
        password: '123456',
        fechaNacimiento: '1995-05-10',
        telefono: '',
        direccion: '',
        codigoPromocional: ''
      })


    expect(
      resultado.success
    ).toBe(false)


    expect(
      resultado.message
    ).toBe(
      'Solo se permiten correos institucionales Duoc.'
    )

  })

})