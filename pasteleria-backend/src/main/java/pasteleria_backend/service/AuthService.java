package pasteleria_backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

import pasteleria_backend.dto.AuthRequest;
import pasteleria_backend.dto.AuthResponse;
import pasteleria_backend.model.Usuario;
import pasteleria_backend.repository.UsuarioRepository;
import pasteleria_backend.security.JwtService;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }


    public AuthResponse login(
            AuthRequest request
    ) {

        Usuario usuario =
                usuarioRepository
                        .findByEmail(request.getEmail())
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Credenciales incorrectas"
                                )
                        );


        boolean passwordCorrecta =
                passwordEncoder.matches(
                        request.getPassword(),
                        usuario.getPassword()
                );


        if (!passwordCorrecta) {

            throw new RuntimeException(
                    "Credenciales incorrectas"
            );
        }


        String token =
                jwtService.generarToken(
                        usuario.getEmail(),
                        usuario.getRol()
                );


        return new AuthResponse(
                token,
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol(),
                usuario.getTelefono()
        );
    }

    public ResponseEntity<?> registrar(
        Usuario usuario
) {

    String email =
            usuario.getEmail()
                    .trim()
                    .toLowerCase();


    boolean dominioPermitido =
            email.endsWith("@duocuc.cl")
            || email.endsWith("@duoc.cl")
            || email.endsWith("@profesor.duocuc.cl")
            || email.endsWith("@profesor.duoc.cl");


    if (!dominioPermitido) {

        return ResponseEntity
                .badRequest()
                .body(
                        "Correo institucional no válido"
                );
    }


    if (
            usuarioRepository
                    .existsByEmail(email)
    ) {

        return ResponseEntity
                .status(409)
                .body(
                        "El correo ya está registrado"
                );
    }


    usuario.setEmail(
            email
    );

    usuario.setRol(
            "CLIENTE"
    );

    usuario.setPassword(
            passwordEncoder.encode(
                    usuario.getPassword()
            )
    );


    Usuario guardado =
            usuarioRepository.save(
                    usuario
            );


    guardado.setPassword(
            null
    );


    return ResponseEntity.ok(
            guardado
    );
}

    public AuthResponse renovarToken(
        String tokenActual
) {

    if (!jwtService.esTokenValido(tokenActual)) {

        throw new RuntimeException(
                "Token inválido o expirado"
        );
    }

    String email =
            jwtService.obtenerEmail(tokenActual);

    Usuario usuario =
            usuarioRepository
                    .findByEmail(email)
                    .orElseThrow(
                            () -> new RuntimeException(
                                    "Usuario no encontrado"
                            )
                    );

    String nuevoToken =
            jwtService.generarToken(
                    usuario.getEmail(),
                    usuario.getRol()
            );

        return new AuthResponse(
                nuevoToken,
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol(),
                usuario.getTelefono()
        );
}
}