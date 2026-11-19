package pasteleria_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import pasteleria_backend.dto.PedidoResponse;
import pasteleria_backend.model.Boleta;
import pasteleria_backend.service.BoletaService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/boletas")
@CrossOrigin(origins = "http://localhost:5173")
public class BoletaController {

    private final BoletaService boletaService;


    public BoletaController(
            BoletaService boletaService
    ) {
        this.boletaService = boletaService;
    }


    @GetMapping
    public ResponseEntity<List<Boleta>> listarBoletas() {

        return ResponseEntity.ok(
                boletaService.listarBoletas()
        );
    }


    /*
     * CLIENTE:
     * obtiene solamente sus propias boletas.
     */
    @GetMapping("/mis-boletas")
    public ResponseEntity<List<PedidoResponse>>
    obtenerMisBoletas(
            Authentication authentication
    ) {

        List<PedidoResponse> pedidos =
                boletaService
                        .obtenerPedidosCliente(
                                authentication.getName()
                        );


        return ResponseEntity.ok(
                pedidos
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<Boleta> buscarPorId(
            @PathVariable Long id
    ) {

        return boletaService
                .buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }


    @PostMapping
    public ResponseEntity<Boleta> crearBoleta(
            @RequestBody Boleta boleta
    ) {

        Boleta boletaGuardada =
                boletaService
                        .guardarBoleta(
                                boleta
                        );


        return ResponseEntity.ok(
                boletaGuardada
        );
    }


    @PutMapping("/{id}")
    public ResponseEntity<Boleta> actualizarBoleta(
            @PathVariable Long id,
            @RequestBody Boleta boleta
    ) {

        try {

            Boleta boletaActualizada =
                    boletaService
                            .actualizarBoleta(
                                    id,
                                    boleta
                            );


            return ResponseEntity.ok(
                    boletaActualizada
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarBoleta(
            @PathVariable Long id
    ) {

        try {

            boletaService
                    .eliminarBoleta(
                            id
                    );


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