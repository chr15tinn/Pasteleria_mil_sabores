import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { paymentService } from '../services/paymentService'


function Checkout() {

  const navigate = useNavigate()

  const {
    cart,
    subtotal,
    clearCart
  } = useCart()

  const {
    user,
    isAuthenticated
  } = useAuth()


  /*
    Los precios publicados ya incluyen IVA.

    Por eso:
    Total = subtotal
    Neto = Total / 1.19
    IVA = Total - Neto
  */

  const neto =
    subtotal / 1.19

  const iva =
    subtotal - neto


  const [form, setForm] = useState({

    nombre:
      user?.nombre || '',

    email:
      user?.email || '',

    telefono:
      user?.telefono || '',

    direccion:
      user?.direccion || '',

    descripcion: '',

    region: '',

    comuna: '',

    codigoPostal: '',

    fechaEntrega: '',

    medioPago: ''

  })


  const [message, setMessage] =
    useState('')
  
  const [simulateFailure, setSimulateFailure] =
    useState(false)


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


    if (cart.length === 0) {

      setMessage(
        '⚠️ Tu carrito está vacío.'
      )

      return
    }


    const productosActuales =
      JSON.parse(
        localStorage.getItem('products') || '[]'
      )


    const stockInsuficiente =
      cart.find(item => {

        const producto =
          productosActuales.find(
            p => p.id === item.id
          )

        return (
          !producto ||
          item.quantity >
            Number(producto.stock || 0)
        )
      })


    if (stockInsuficiente) {

      setMessage(
        `⚠️ Stock insuficiente para ${stockInsuficiente.name}. Ajusta la cantidad antes de comprar.`
      )

      return
    }


    if (
      !form.nombre ||
      !form.email ||
      !form.telefono ||
      !form.direccion ||
      !form.region ||
      !form.comuna ||
      !form.codigoPostal ||
      !form.fechaEntrega ||
      !form.medioPago
    ) {

      setMessage(
        '⚠️ Completa todos los campos obligatorios.'
      )

      return
    }

    const paymentResult =
  paymentService.processPayment({
    medioPago:
      form.medioPago,

    total:
      subtotal,

    simulateFailure
  })


if (!paymentResult.success) {

  localStorage.setItem(
    'ultimoPagoFallido',
    JSON.stringify({
      mensaje:
        paymentResult.message,

      total:
        subtotal,

      medioPago:
        form.medioPago,

      fecha:
        new Date()
          .toLocaleString('es-CL')
    })
  )

  navigate('/compra-fallida')

  return
}

    const numeroPedido =
      'PED-' +
      Date.now()
        .toString()
        .slice(-6)


    const pedido = {

      numeroPedido,

      usuarioId:
        user?.id || null,

      nombre:
        form.nombre,

      email:
        form.email,

      telefono:
        form.telefono,

      direccion:
        form.direccion,

      descripcion:
        form.descripcion,

      region:
        form.region,

      comuna:
        form.comuna,

      codigoPostal:
        form.codigoPostal,

      fechaEntrega:
        form.fechaEntrega,

      medioPago:
        form.medioPago,

      productos:
        cart,

      neto:
        Math.round(neto),

      iva:
        Math.round(iva),

      subtotal:
        subtotal,

      total:
        subtotal,

      estado:
        'Pedido recibido',

      fecha:
        new Date()
          .toLocaleString('es-CL')

    }


    localStorage.setItem(
      'ultimaCompra',
      JSON.stringify(pedido)
    )


    const pedidos =
      JSON.parse(
        localStorage.getItem('pedidos')
      ) || []


    pedidos.push(pedido)


    localStorage.setItem(
      'pedidos',
      JSON.stringify(pedidos)
    )


    clearCart()


    navigate('/compra-exitosa')
  }


  const hoy =
    new Date()
      .toISOString()
      .split('T')[0]


  return (

    <main className="container py-5">

      <div className="row g-4">


        {/* DATOS DEL CLIENTE */}

        <div className="col-lg-7">

          <div className="card shadow-sm p-4">

            <h1
              className="mb-4"
              style={{
                color: '#8B4513'
              }}
            >
              Finalizar compra
            </h1>


            {isAuthenticated && (

              <div className="alert alert-info">

                👤 Hemos cargado automáticamente
                algunos datos de tu perfil.

              </div>

            )}


            {message && (

              <div className="alert alert-danger">

                {message}

              </div>

            )}


            <form
              onSubmit={handleSubmit}
            >


              {/* NOMBRE */}

              <div className="mb-3">

                <label className="form-label">
                  Nombre completo
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CORREO */}

              <div className="mb-3">

                <label className="form-label">
                  Correo
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* TELÉFONO */}

              <div className="mb-3">

                <label className="form-label">
                  Teléfono
                </label>

                <input
                  type="tel"
                  className="form-control"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="Ej: 912345678"
                  required
                />

              </div>


              {/* DIRECCIÓN */}

              <div className="mb-3">

                <label className="form-label">
                  Dirección de entrega
                </label>

                <input
                  className="form-control"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Calle y número"
                  required
                />

              </div>


              {/* REFERENCIA */}

              <div className="mb-3">

                <label className="form-label">
                  Referencia de la dirección
                </label>

                <input
                  className="form-control"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Casa, departamento, block, oficina, etc."
                />

              </div>


              {/* REGIÓN Y COMUNA */}

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Región
                  </label>

                  <select
                    className="form-select"
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Selecciona región
                    </option>

                    <option value="Región Metropolitana">
                      Región Metropolitana
                    </option>

                    <option value="Región de Valparaíso">
                      Región de Valparaíso
                    </option>

                    <option value="Región del Biobío">
                      Región del Biobío
                    </option>

                    <option value="Región de La Araucanía">
                      Región de La Araucanía
                    </option>

                    <option value="Región de Los Lagos">
                      Región de Los Lagos
                    </option>

                  </select>

                </div>


                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Comuna
                  </label>

                  <input
                    className="form-control"
                    name="comuna"
                    value={form.comuna}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* CÓDIGO POSTAL Y FECHA */}

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Código postal
                  </label>

                  <input
                    className="form-control"
                    name="codigoPostal"
                    value={form.codigoPostal}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Fecha de entrega
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="fechaEntrega"
                    min={hoy}
                    value={form.fechaEntrega}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* MEDIO DE PAGO */}

              <div className="mb-4">

                <label className="form-label">
                  Medio de pago
                </label>

                <select
                  className="form-select"
                  name="medioPago"
                  value={form.medioPago}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Selecciona una opción
                  </option>

                  <option value="Débito">
                    Débito
                  </option>

                  <option value="Crédito">
                    Crédito
                  </option>

                </select>

              </div>

        <div className="form-check mb-4">

          <input
            className="form-check-input"
            type="checkbox"
            id="simulateFailure"
            checked={simulateFailure}
            onChange={event =>
              setSimulateFailure(
                event.target.checked
              )
            }
          />

          <label
            className="form-check-label"
            htmlFor="simulateFailure"
          >
            Simular rechazo de pago
            <span className="text-muted">
              {' '}(solo para pruebas)
            </span>
          </label>

        </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Confirmar compra
              </button>

            </form>

          </div>

        </div>


        {/* RESUMEN */}

        <div className="col-lg-5">

          <div className="card shadow-sm p-4">

            <h4>
              Resumen del pedido
            </h4>

            <hr />


            {cart.map(item => (

              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >

                <span>
                  {item.name}
                  {' '}
                  x{item.quantity}
                </span>

                <span>

                  $
                  {
                    (
                      item.price *
                      item.quantity
                    )
                      .toLocaleString('es-CL')
                  }

                </span>

              </div>

            ))}


            <hr />


            <div
              className="d-flex justify-content-between mb-2"
            >

              <span>
                Neto
              </span>

              <strong>
                $
                {Math.round(neto)
                  .toLocaleString('es-CL')}
              </strong>

            </div>


            <div
              className="d-flex justify-content-between mb-2"
            >

              <span>
                IVA (19%)
              </span>

              <strong>
                $
                {Math.round(iva)
                  .toLocaleString('es-CL')}
              </strong>

            </div>


            <hr />


            <div
              className="d-flex justify-content-between"
            >

              <span className="fw-bold">
                Total
              </span>

              <strong
                style={{
                  color: '#8B4513',
                  fontSize: '1.25rem'
                }}
              >

                $
                {subtotal
                  .toLocaleString('es-CL')}

              </strong>

            </div>


            <p
              className="text-muted small mt-2 mb-0"
            >
              Los precios incluyen IVA.
            </p>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Checkout