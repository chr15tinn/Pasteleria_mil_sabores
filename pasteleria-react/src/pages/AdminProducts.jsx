import { useEffect, useState } from 'react'
import { productRepository } from '../repositories/productRepository'

function AdminProducts() {

  const [products, setProducts] = useState([])

  const [form, setForm] = useState({
    id: '',
    category: '',
    name: '',
    price: '',
    description: '',
    image: '',
    stock: '',
    offer: false
  })

  const [editingId, setEditingId] = useState(null)


  function loadProducts() {
    const data = productRepository.getAll()
    setProducts(data)
  }


  useEffect(() => {
    loadProducts()
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
      id: '',
      category: '',
      name: '',
      price: '',
      description: '',
      image: '',
      stock: '',
      offer: false
    })

    setEditingId(null)
  }


  function handleSubmit(event) {

    event.preventDefault()

    const productData = {
      id:
        editingId ||
        form.id.trim(),

      category:
        form.category.trim(),

      name:
        form.name.trim(),

      price:
        Number(form.price),

      description:
        form.description.trim(),

      image:
        form.image.trim(),

      stock:
        Number(form.stock),

      offer:
        form.offer
    }


    if (editingId) {

      productRepository.update(
        editingId,
        productData
      )

    } else {

      const existing =
        productRepository.getById(
          productData.id
        )

      if (existing) {

        alert(
          '⚠️ Ya existe un producto con ese código.'
        )

        return
      }

      productRepository.create(
        productData
      )
    }


    resetForm()
    loadProducts()
  }


  function handleEdit(product) {

    setEditingId(product.id)

    setForm({
      id: product.id,
      category: product.category,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image || '',
      stock: product.stock,
      offer: product.offer || false
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  function handleDelete(id) {

    const confirmDelete =
      window.confirm(
        '¿Seguro que quieres eliminar este producto?'
      )

    if (!confirmDelete) {
      return
    }


    productRepository.remove(id)

    loadProducts()
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

          <div className="col-md-4">

            <label className="form-label">
              Código
            </label>

            <input
              className="form-control"
              name="id"
              value={form.id}
              onChange={handleChange}
              disabled={!!editingId}
              required
            />

          </div>


          <div className="col-md-4">

            <label className="form-label">
              Categoría
            </label>

            <input
              className="form-control"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />

          </div>


          <div className="col-md-4">

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
              placeholder="/images/producto.jpg"
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

                <th>Código</th>

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

                <tr
                  key={product.id}
                >

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
                    ).toLocaleString('es-CL')}
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