function Price({ value }) {
  return (
    <span className="fw-bold">
      ${Number(value).toLocaleString('es-CL')} CLP
    </span>
  )
}

export default Price