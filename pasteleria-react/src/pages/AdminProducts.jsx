import { useEffect, useState } from 'react'

import { productRepository } from '../repositories/productRepository'
import { apiRequest } from '../services/api'

function AdminProducts() {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    categoryId: '',
    name: '',
    price: '',
    description: '',
    image: '',
    stock: '',
    offer: false
  })

  const [editingId, setEditingId] =
    useState(null)


  async function loadProducts() {

    try {

      const data =
        await productRepository.getAll()

      const adaptedProducts =
        data.map(product => ({
          id: product.id,

          name:
            product.nombre,

          description:
            product.descripcion || '',

          price:
            Number(product.precio),

          stock:
            product.stock,

          image:
            product.imagen || '',

          offer:
            product.oferta,

          category:
            product.categoria?.nombre ||
            'Sin categoría',

          categoryId:
            product.categoria?.id
        }))

      setProducts(adaptedProducts)

    } catch (error) {

      console.error(
        'Error al cargar productos:',
        error
      )

      setMessage(
        'No fue posible cargar los productos.'
      )
    }
  }


  async function loadCategories() {

    try {

      const data =
        await apiRequest('/categorias')

      setCategories(data)

    } catch (error) {

      console.error(
        'Error al cargar categorías:',
        error
      )

      setMessage(
        'No fue posible cargar las categorías.'
      )
    }
  }


  useEffect(() => {

    async function loadData() {

      setLoading(true)
      setMessage('')

      await Promise.all([
        loadProducts(),
        loadCategories()
      ])

      setLoading(false)
    }

    loadData()

  }, [])


  function handleChange(event) {

    const {
      name,
      value,
      type,
      checked
    } = event.target

    setForm(current => ({
      ...current,

      [name]:
        type === 'checkbox'
          ? checked
          : value
    }))
  }


  function resetForm() {

    setForm({
      categoryId: '',
      name: '',
      price: '',
      description: '',
      image: '',
      stock: '',
      offer: false
    })

    setEditingId(null)
  }


  async function handleSubmit(event) {

    event.preventDefault()

    setMessage('')

    const productData = {

      nombre:
        form.name.trim(),

      descripcion:
        form.description.trim(),

      precio:
        Number(form.price),

      stock:
        Number(form.stock),

      imagen:
        form.image.trim(),

      oferta:
        form.offer,

      categoria: {
        id:
          Number(form.categoryId)
      }
    }


    try {

      if (editingId) {

        await productRepository.update(
          editingId,
          productData
        )

        setMessage(
          '✅ Producto actualizado correctamente.'
        )

      } else {

        await productRepository.create(
          productData
        )

        setMessage(
          '✅ Producto creado correctamente.'
        )
      }


      resetForm()

      await loadProducts()

    } catch (error) {

      console.error(
        'Error al guardar producto:',
        error
      )

      if (error.status === 403) {

        setMessage(
          'No tienes permiso para realizar esta operación.'
        )

        return
      }

      setMessage(
        'No fue posible guardar el producto.'
      )
    }
  }


  function handleEdit(product) {

    setEditingId(product.id)

    setForm({
      categoryId:
        product.categoryId || '',

      name:
        product.name,

      price:
        product.price,

      description:
        product.description,

      image:
        product.image || '',

      stock:
        product.stock,

      offer:
        product.offer || false
    })


    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  async function handleDelete(id) {

    const confirmDelete =
      window.confirm(
        '¿Seguro que quieres eliminar este producto?'
      )

    if (!confirmDelete) {
      return
    }


    try {

      await productRepository.remove(id)

      setMessage(
        '✅ Producto eliminado correctamente.'
      )

      await loadProducts()

    } catch (error) {

      console.error(
        'Error al eliminar producto:',
        error
      )

      if (error.status === 403) {

        setMessage(
          'No tienes permiso para eliminar productos.'
        )

        return
      }

      setMessage(
        'No fue posible eliminar el producto.'
      )
    }
  }


  if (loading) {

    return (

      <main className="container py-5">

        <p className="text-center">
          Cargando administración...
        </p>

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
        Panel de administración
      </h1>


      {message && (

        <div className="alert alert-info">
          {message}
        </div>

      )}


      <div className="card shadow-sm p-4 mb-5">

        <h4>
          {editingId
            ? 'Editar producto'
            : 'Nuevo producto'}
        </h4>


        <form
          onSubmit={handleSubmit}
          className="row g-3"
        >

          <div className="col-md-6">

            <label className="form-label">
              Categoría
            </label>

            <select
              className="form-select"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
            >

              <option value="">
                Seleccionar categoría
              </option>


              {categories.map(category => (

                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.nombre}
                </option>

              ))}

            </select>

          </div>


          <div className="col-md-6">

            <label className="form-label">
              Nombre
            </label>

            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>


          <div className="col-md-3">

            <label className="form-label">
              Precio
            </label>

            <input
              type="number"
              min="0"
              className="form-control"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />

          </div>


          <div className="col-md-3">

            <label className="form-label">
              Stock
            </label>

            <input
              type="number"
              min="0"
              className="form-control"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
            />

          </div>


          <div className="col-md-6">

            <label className="form-label">
              URL de imagen
            </label>

            <input
              className="form-control"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />

          </div>


          <div className="col-12">

            <label className="form-label">
              Descripción
            </label>

            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />

          </div>


          <div className="col-12">

            <div className="form-check">

              <input
                type="checkbox"
                className="form-check-input"
                id="offer"
                name="offer"
                checked={form.offer}
                onChange={handleChange}
              />

              <label
                className="form-check-label"
                htmlFor="offer"
              >
                Producto en oferta
              </label>

            </div>

          </div>


          <div className="col-12 d-flex gap-2">

            <button
              type="submit"
              className="btn btn-dark"
            >
              {editingId
                ? 'Guardar cambios'
                : 'Crear producto'}
            </button>


            {editingId && (

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={resetForm}
              >
                Cancelar edición
              </button>

            )}

          </div>

        </form>

      </div>


      <div className="card shadow-sm p-4">

        <h4 className="mb-3">
          Productos registrados
        </h4>


        <div className="table-responsive">

          <table className="table table-bordered align-middle">

            <thead>

              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Oferta</th>
                <th>Acciones</th>
              </tr>

            </thead>


            <tbody>

              {products.map(product => (

                <tr key={product.id}>

                  <td>
                    {product.id}
                  </td>


                  <td>
                    {product.name}
                  </td>


                  <td>
                    {product.category}
                  </td>


                  <td>
                    $
                    {Number(
                      product.price
                    ).toLocaleString(
                      'es-CL'
                    )}
                  </td>


                  <td>

                    {product.stock}

                    {product.stock <= 5 && (

                      <span
                        className="badge bg-danger ms-2"
                      >
                        Stock crítico
                      </span>

                    )}

                  </td>


                  <td>
                    {product.offer
                      ? 'Sí'
                      : 'No'}
                  </td>


                  <td>

                    <div className="d-flex gap-2">

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          handleEdit(product)
                        }
                      >
                        Editar
                      </button>


                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(
                            product.id
                          )
                        }
                      >
                        Eliminar
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  )
}

export default AdminProducts