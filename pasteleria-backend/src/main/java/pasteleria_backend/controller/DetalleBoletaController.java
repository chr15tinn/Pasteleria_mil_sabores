package pasteleria_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pasteleria_backend.model.DetalleBoleta;
import pasteleria_backend.service.DetalleBoletaService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/detalles-boleta")
@CrossOrigin(origins = "http://localhost:5173")
public class DetalleBoletaController {

    private final DetalleBoletaService detalleBoletaService;

    public DetalleBoletaController(
            DetalleBoletaService detalleBoletaService
    ) {
        this.detalleBoletaService =
                detalleBoletaService;
    }

    @GetMapping
    public ResponseEntity<List<DetalleBoleta>> listarDetalles() {

        return ResponseEntity.ok(
                detalleBoletaService.listarDetalles()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetalleBoleta> buscarPorId(
            @PathVariable Long id
    ) {

        return detalleBoletaService
                .buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }

    @PostMapping
    public ResponseEntity<DetalleBoleta> crearDetalle(
            @RequestBody DetalleBoleta detalleBoleta
    ) {

        DetalleBoleta detalleGuardado =
                detalleBoletaService
                        .guardarDetalle(detalleBoleta);

        return ResponseEntity.ok(
                detalleGuardado
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetalleBoleta> actualizarDetalle(
            @PathVariable Long id,
            @RequestBody DetalleBoleta detalleBoleta
    ) {

        try {

            DetalleBoleta detalleActualizado =
                    detalleBoletaService
                            .actualizarDetalle(
                                    id,
                                    detalleBoleta
                            );

            return ResponseEntity.ok(
                    detalleActualizado
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDetalle(
            @PathVariable Long id
    ) {

        try {

            detalleBoletaService
                    .eliminarDetalle(id);

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