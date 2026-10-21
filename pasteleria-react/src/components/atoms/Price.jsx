function Price({ value }) {

  return (
    <p className="precio-producto mb-2">
      $
      {Number(value).toLocaleString('es-CL')}
      {' '}CLP
    </p>
  )
}

export default Price