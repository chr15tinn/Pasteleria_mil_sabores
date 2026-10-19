import { useState } from 'react'
import { Link } from 'react-router-dom'

function Tracking() {

  const pedidoGuardado =
    JSON.parse(
      localStorage.getItem(
        'pedidoSeleccionado'
      )
    )


  const [pedido, setPedido] =
    useState(pedidoGuardado)


  if (!pedido) {

    return (
      <main className="container py-5">

        <div className="alert alert-warning text-center">
          No seleccionaste ningún pedido.
        </div>

      </main>
    )
  }


  const estados = [
    'Pedido recibido',
    'En preparación',
    'En camino',
    'Entregado'
  ]


  const posicionActual =
    Math.max(
      0,
      estados.indexOf(
        pedido.estado
      )
    )


  function actualizarEstado() {

    if (
      posicionActual >=
      estados.length - 1
    ) {

      alert(
        '🎂 Este pedido ya fue entregado.'
      )

      return
    }


    const nuevoEstado =
      estados[
        posicionActual + 1
      ]


    const pedidoActualizado = {
      ...pedido,
      estado: nuevoEstado
    }


    setPedido(
      pedidoActualizado
    )


    localStorage.setItem(
      'pedidoSeleccionado',
      JSON.stringify(
        pedidoActualizado
      )
    )


    const pedidos =
      JSON.parse(
        localStorage.getItem(
          'pedidos'
        )
      ) || []


    const pedidosActualizados =
      pedidos.map(item =>

        item.numeroPedido ===
        pedido.numeroPedido

          ? pedidoActualizado

          : item

      )


    localStorage.setItem(
      'pedidos',
      JSON.stringify(
        pedidosActualizados
      )
    )


    const ultimaCompra =
      JSON.parse(
        localStorage.getItem(
          'ultimaCompra'
        )
      )


    if (
      ultimaCompra?.numeroPedido ===
      pedido.numeroPedido
    ) {

      localStorage.setItem(
        'ultimaCompra',
        JSON.stringify(
          pedidoActualizado
        )
      )
    }
  }


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
          Pedido {pedido.numeroPedido}
        </h5>


        <p>
          <strong>Cliente:</strong>{' '}
          {pedido.email}
        </p>


        <p>
          <strong>Total:</strong>{' '}
          $
          {Number(
            pedido.total
          ).toLocaleString('es-CL')}
        </p>


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


            const iconos = [
              '✅',
              '👨‍🍳',
              '🚚',
              '🎂'
            ]


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


        <div
          className="d-flex justify-content-between mt-4"
        >

          <Link
            to="/pedidos"
            className="btn btn-outline-dark"
          >
            Volver
          </Link>


          <button
            className="btn btn-dark"
            onClick={
              actualizarEstado
            }
          >
            Actualizar estado
          </button>

        </div>

      </div>

    </main>
  )
}

export default Tracking