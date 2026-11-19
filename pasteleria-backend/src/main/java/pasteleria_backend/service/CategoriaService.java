package pasteleria_backend.service;

import org.springframework.stereotype.Service;

import pasteleria_backend.model.Categoria;
import pasteleria_backend.repository.CategoriaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;


    public CategoriaService(
            CategoriaRepository categoriaRepository
    ) {
        this.categoriaRepository = categoriaRepository;
    }


    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }


    public Optional<Categoria> buscarPorId(Long id) {
        return categoriaRepository.findById(id);
    }


    public Categoria guardarCategoria(
            Categoria categoria
    ) {
        return categoriaRepository.save(categoria);
    }


    public Categoria actualizarCategoria(
            Long id,
            Categoria categoriaActualizada
    ) {

        Categoria categoria =
                categoriaRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Categoría no encontrada"
                                        )
                        );


        categoria.setNombre(
                categoriaActualizada.getNombre()
        );

        categoria.setDescripcion(
                categoriaActualizada.getDescripcion()
        );


        return categoriaRepository.save(
                categoria
        );
    }


    public void eliminarCategoria(Long id) {

        if (
                !categoriaRepository.existsById(id)
        ) {

            throw new RuntimeException(
                    "Categoría no encontrada"
            );
        }


        categoriaRepository.deleteById(id);
    }
}