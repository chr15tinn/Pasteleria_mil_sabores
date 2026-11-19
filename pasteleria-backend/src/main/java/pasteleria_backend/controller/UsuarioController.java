package pasteleria_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pasteleria_backend.model.Usuario;
import pasteleria_backend.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;


    public UsuarioController(
            UsuarioService usuarioService
    ) {
        this.usuarioService = usuarioService;
    }


    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {

        return ResponseEntity.ok(
                usuarioService.listarUsuarios()
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(
            @PathVariable Long id
    ) {

        return usuarioService
                .buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build()
                );
    }


    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(
            @RequestBody Usuario usuario
    ) {

        try {

            Usuario usuarioGuardado =
                    usuarioService
                            .guardarUsuario(usuario);

            return ResponseEntity.ok(
                    usuarioGuardado
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuario
    ) {

        try {

            Usuario usuarioActualizado =
                    usuarioService
                            .actualizarUsuario(
                                    id,
                                    usuario
                            );

            return ResponseEntity.ok(
                    usuarioActualizado
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(
            @PathVariable Long id
    ) {

        try {

            usuarioService.eliminarUsuario(id);

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