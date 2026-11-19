import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'

import {
  apiRequest
} from '../services/api'

import {
  authService
} from '../services/authService'


vi.mock(
  '../services/api',
  () => ({
    apiRequest: vi.fn()
  })
)


describe('authService', () => {

  beforeEach(() => {

    localStorage.clear()

    vi.clearAllMocks()
  })


  it(
    'registra correctamente un nuevo usuario',
    async () => {

      apiRequest.mockResolvedValue({
        id: 5,
        nombre: 'Christian',
        email:
          'christian@duocuc.cl',
        rol: 'CLIENTE',
        telefono:
          '912345678'
      })


      const resultado =
        await authService.register({
          nombre: 'Christian',
          email:
            'christian@duocuc.cl',
          password: '123456',
          telefono:
            '912345678'
        })


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
        resultado.user.rol
      ).toBe('CLIENTE')


      expect(
        apiRequest
      ).toHaveBeenCalledWith(
        '/auth/register',
        {
          method: 'POST',

          body:
            JSON.stringify({
              nombre:
                'Christian',

              email:
                'christian@duocuc.cl',

              password:
                '123456',

              telefono:
                '912345678'
            })
        }
      )
    }
  )


  it(
    'permite iniciar sesión con datos correctos',
    async () => {

      apiRequest.mockResolvedValue({
        token:
          'token-prueba',

        id: 5,

        nombre:
          'Christian',

        email:
          'christian@duocuc.cl',

        rol:
          'CLIENTE',

        telefono:
          '912345678'
      })


      const resultado =
        await authService.authenticate(
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


      expect(
        localStorage.getItem(
          'token'
        )
      ).toBe(
        'token-prueba'
      )


      const usuarioGuardado =
        JSON.parse(
          localStorage.getItem(
            'usuario'
          )
        )


      expect(
        usuarioGuardado.email
      ).toBe(
        'christian@duocuc.cl'
      )
    }
  )


  it(
    'rechaza el inicio de sesión con contraseña incorrecta',
    async () => {

      const error =
        new Error(
          'Credenciales incorrectas'
        )

      error.status = 401


      apiRequest.mockRejectedValue(
        error
      )


      const resultado =
        await authService.authenticate(
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
    }
  )


  it(
    'rechaza registros con dominios no permitidos',
    async () => {

      const error =
        new Error(
          'Correo inválido'
        )

      error.status = 400


      apiRequest.mockRejectedValue(
        error
      )


      const resultado =
        await authService.register({
          nombre:
            'Christian',

          email:
            'christian@gmail.com',

          password:
            '123456',

          telefono:
            ''
        })


      expect(
        resultado.success
      ).toBe(false)


      expect(
        resultado.message
      ).toBe(
        'Debes usar un correo institucional Duoc válido.'
      )
    }
  )

})