package pasteleria_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pasteleria_backend.model.Producto;
import pasteleria_backend.service.ProductoService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    private final ProductoService productoService;


    public ProductoController(
            ProductoService productoService
    ) {
        this.productoService = productoService;
    }


    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {

        return ResponseEntity.ok(
                productoService.listarProductos()
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<Producto> buscarPorId(
            @PathVariable Long id
    ) {

        return productoService
                .buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }


    @PostMapping
    public ResponseEntity<Producto> crearProducto(
            @RequestBody Producto producto
    ) {

        Producto productoGuardado =
                productoService
                        .guardarProducto(producto);

        return ResponseEntity.ok(
                productoGuardado
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Long id,
            @RequestBody Producto producto
    ) {

        try {

            Producto productoActualizado =
                    productoService
                            .actualizarProducto(
                                    id,
                                    producto
                            );

            return ResponseEntity.ok(
                    productoActualizado
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(
            @PathVariable Long id
    ) {

        try {

            productoService
                    .eliminarProducto(id);

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