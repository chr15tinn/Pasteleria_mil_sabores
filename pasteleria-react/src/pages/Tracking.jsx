import {
  useEffect,
  useState
} from 'react'

import {
  Link
} from 'react-router-dom'

import {
  apiRequest
} from '../services/api'


function Tracking() {

  const [pedido, setPedido] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')


  useEffect(() => {

    async function cargarSeguimiento() {

      try {

        setLoading(true)
        setError('')


        const pedidoSeleccionado =
          JSON.parse(
            localStorage.getItem(
              'pedidoSeleccionado'
            )
          )


        if (!pedidoSeleccionado) {

          setError(
            'No seleccionaste ningún pedido.'
          )

          return
        }


        /*
         * Consultamos nuevamente los pedidos
         * reales del cliente desde MySQL.
         */
        const pedidos =
          await apiRequest(
            '/boletas/mis-boletas'
          )


        const pedidoActualizado =
          pedidos.find(
            item =>
              Number(item.id) ===
              Number(
                pedidoSeleccionado.id ||
                pedidoSeleccionado.boletaId
              )
          )


        if (!pedidoActualizado) {

          setError(
            'No se encontró el pedido seleccionado.'
          )

          return
        }


        const pedidoAdaptado = {

          id:
            pedidoActualizado.id,

          numeroPedido:
            `PED-${pedidoActualizado.id}`,

          email:
            pedidoSeleccionado.email || '',

          total:
            Number(
              pedidoActualizado.total || 0
            ),

          estado:
            pedidoActualizado.estado ||
            'Pedido recibido',

          direccion:
            pedidoActualizado.direccion ||
            '',

          medioPago:
            pedidoActualizado.medioPago ||
            '',

          fecha:
            pedidoActualizado.fecha
              ? new Date(
                  pedidoActualizado.fecha
                ).toLocaleString(
                  'es-CL'
                )
              : ''
        }


        setPedido(
          pedidoAdaptado
        )


        /*
         * Actualizamos también el pedido
         * seleccionado localmente.
         */
        localStorage.setItem(
          'pedidoSeleccionado',
          JSON.stringify(
            pedidoAdaptado
          )
        )

      } catch (error) {

        console.error(
          'Error al cargar seguimiento:',
          error
        )


        if (
          error.status === 401
        ) {

          setError(
            'Tu sesión expiró. Inicia sesión nuevamente.'
          )

          return
        }


        if (
          error.status === 403
        ) {

          setError(
            'No tienes permiso para consultar este pedido.'
          )

          return
        }


        setError(
          'No fue posible cargar el seguimiento del pedido.'
        )

      } finally {

        setLoading(false)
      }
    }


    cargarSeguimiento()

  }, [])


  const estados = [
    'Pedido recibido',
    'En preparación',
    'En camino',
    'Entregado'
  ]


  const iconos = [
    '✅',
    '👨‍🍳',
    '🚚',
    '🎂'
  ]


  if (loading) {

    return (

      <main className="container py-5">

        <p className="text-center">
          Cargando seguimiento...
        </p>

      </main>
    )
  }


  if (
    error ||
    !pedido
  ) {

    return (

      <main className="container py-5">

        <div className="alert alert-warning text-center">

          {error ||
            'No seleccionaste ningún pedido.'}

        </div>


        <div className="text-center">

          <Link
            to="/pedidos"
            className="btn btn-outline-dark"
          >
            Volver a mis pedidos
          </Link>

        </div>

      </main>
    )
  }


  const posicionActual =
    Math.max(
      0,
      estados.indexOf(
        pedido.estado
      )
    )


  return (

    <main className="container py-5">

      <div
        className="card shadow-sm p-4 mx-auto"
        style={{
          maxWidth: '800px'
        }}
      >

        <h1
          className="text-center mb-4"
          style={{
            color: '#8B4513'
          }}
        >
          📦 Seguimiento del pedido
        </h1>


        <h5>

          Pedido{' '}
          {pedido.numeroPedido}

        </h5>


        {pedido.email && (

          <p>

            <strong>
              Cliente:
            </strong>{' '}

            {pedido.email}

          </p>

        )}


        <p>

          <strong>
            Total:
          </strong>{' '}

          $
          {pedido.total
            .toLocaleString(
              'es-CL'
            )}

        </p>


        {pedido.fecha && (

          <p>

            <strong>
              Fecha:
            </strong>{' '}

            {pedido.fecha}

          </p>

        )}


        <hr />


        <h5 className="mb-4">
          Estado del pedido
        </h5>


        {estados.map(
          (estado, index) => {

            let clase =
              'border rounded p-3 mb-2'


            if (
              index <
              posicionActual
            ) {

              clase +=
                ' bg-success-subtle'

            } else if (
              index ===
              posicionActual
            ) {

              clase +=
                ' bg-warning-subtle fw-bold'

            } else {

              clase +=
                ' bg-light text-muted'
            }


            return (

              <div
                key={estado}
                className={clase}
              >

                {iconos[index]}
                {' '}
                {estado}

              </div>

            )
          }
        )}


        <div className="alert alert-info mt-4">

          Estado actual:
          {' '}

          <strong>
            {pedido.estado}
          </strong>

        </div>


        <div className="text-center mt-4">

          <Link
            to="/pedidos"
            className="btn btn-outline-dark"
          >
            Volver a mis pedidos
          </Link>

        </div>

      </div>

    </main>
  )
}

export default Tracking