function SearchBar({
  search,
  onSearchChange
}) {
  return (
    <div className="mb-4">

      <label
        htmlFor="searchProducts"
        className="form-label fw-bold"
      >
        Buscar productos
      </label>

      <input
        id="searchProducts"
        type="text"
        className="form-control"
        placeholder="Ej: chocolate, vegana, cheesecake..."
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
      />

    </div>
  )
}

export default SearchBar