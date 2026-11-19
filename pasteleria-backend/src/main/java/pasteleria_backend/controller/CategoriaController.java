package pasteleria_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pasteleria_backend.model.Categoria;
import pasteleria_backend.service.CategoriaService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

    private final CategoriaService categoriaService;


    public CategoriaController(
            CategoriaService categoriaService
    ) {
        this.categoriaService = categoriaService;
    }


    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias() {

        return ResponseEntity.ok(
                categoriaService.listarCategorias()
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(
            @PathVariable Long id
    ) {

        return categoriaService
                .buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }


    @PostMapping
    public ResponseEntity<Categoria> crearCategoria(
            @RequestBody Categoria categoria
    ) {

        Categoria categoriaGuardada =
                categoriaService
                        .guardarCategoria(categoria);

        return ResponseEntity.ok(
                categoriaGuardada
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizarCategoria(
            @PathVariable Long id,
            @RequestBody Categoria categoria
    ) {

        try {

            Categoria categoriaActualizada =
                    categoriaService
                            .actualizarCategoria(
                                    id,
                                    categoria
                            );

            return ResponseEntity.ok(
                    categoriaActualizada
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCategoria(
            @PathVariable Long id
    ) {

        try {

            categoriaService
                    .eliminarCategoria(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}