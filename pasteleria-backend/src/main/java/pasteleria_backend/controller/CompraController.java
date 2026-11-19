package pasteleria_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import pasteleria_backend.dto.CompraRequest;
import pasteleria_backend.model.Boleta;
import pasteleria_backend.service.CompraService;

@RestController
@RequestMapping("/api/v1/compras")
@CrossOrigin(origins = "http://localhost:5173")
public class CompraController {

    private final CompraService compraService;


    public CompraController(
            CompraService compraService
    ) {
        this.compraService =
                compraService;
    }


    @PostMapping
    public ResponseEntity<Boleta> comprar(
            @RequestBody CompraRequest request,
            Authentication authentication
    ) {

        Boleta boleta =
                compraService.realizarCompra(
                        authentication.getName(),
                        request
                );


        return ResponseEntity.ok(
                boleta
        );
    }
}