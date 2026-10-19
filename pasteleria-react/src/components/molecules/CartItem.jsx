import Price from '../atoms/Price'

function CartItem({
  item,
  onRemove,
  onQuantityChange
}) {

  const subtotal =
    item.price *
    item.quantity


  return (

    <tr>

      <td>
        {item.name}
      </td>


      <td>
        <Price
          value={item.price}
        />
      </td>


      <td>

        <input
          type="number"
          min="1"
          className="form-control"
          style={{
            width: '80px'
          }}
          value={item.quantity}
          onChange={(event) =>
            onQuantityChange(
              item.id,
              event.target.value
            )
          }
        />

      </td>


      <td>
        <Price
          value={subtotal}
        />
      </td>


      <td>

        <button
          className="btn btn-danger btn-sm"
          onClick={() =>
            onRemove(item.id)
          }
        >
          Eliminar
        </button>

      </td>

    </tr>
  )
}

export default CartItem