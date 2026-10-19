import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

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


  const [form, setForm] = useState({

    email:
      user?.email || '',

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


    if (
      !form.email ||
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


    const numeroPedido =
      'PED-' +
      Date.now()
        .toString()
        .slice(-6)


    const pedido = {

      numeroPedido,

      usuarioId:
        user?.id || null,

      email:
        form.email,

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


              <div className="mb-3">

                <label className="form-label">
                  Dirección
                </label>

                <input
                  className="form-control"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="mb-3">

                <label className="form-label">
                  Descripción
                </label>

                <input
                  className="form-control"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Casa, departamento, etc."
                />

              </div>


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


              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Confirmar compra
              </button>

            </form>

          </div>

        </div>


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


            <h5 className="text-end">

              Total:
              {' '}
              $
              {
                subtotal
                  .toLocaleString('es-CL')
              }

            </h5>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Checkout