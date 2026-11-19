package pasteleria_backend.controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import pasteleria_backend.dto.AuthRequest;
import pasteleria_backend.dto.AuthResponse;
import pasteleria_backend.security.JwtService;
import pasteleria_backend.service.AuthService;
import pasteleria_backend.dto.RefreshTokenRequest;
import pasteleria_backend.model.Usuario;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;


    public AuthController(
            AuthService authService,
            JwtService jwtService
    ) {
        this.authService = authService;
        this.jwtService = jwtService;
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest request
    ) {

        try {

            AuthResponse response =
                    authService.login(request);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(401)
                    .build();
        }
    }


    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(
            Authentication authentication,
            HttpServletRequest request
    ) {

        Map<String, Object> datos =
                new HashMap<>();

        String header =
                request.getHeader("Authorization");


        datos.put(
                "headerRecibido",
                header != null
        );


        if (
                header != null
                && header.startsWith("Bearer ")
        ) {

            String token =
                    header.substring(7);

            boolean tokenValido =
                    jwtService.esTokenValido(token);

            datos.put(
                    "tokenValido",
                    tokenValido
            );


            if (tokenValido) {

                datos.put(
                        "emailToken",
                        jwtService.obtenerEmail(token)
                );

                datos.put(
                        "rolToken",
                        jwtService.obtenerRol(token)
                );
            }
        }


        if (authentication == null) {

            datos.put(
                    "autenticado",
                    false
            );

        } else {

            datos.put(
                    "autenticado",
                    true
            );

            datos.put(
                    "usuario",
                    authentication.getName()
            );

            datos.put(
                    "autoridades",
                    authentication.getAuthorities()
            );
        }


        return ResponseEntity.ok(datos);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(
        @RequestBody RefreshTokenRequest request
) {

    try {

        AuthResponse response =
                authService.renovarToken(
                        request.getToken()
                );

        return ResponseEntity.ok(response);

    } catch (RuntimeException e) {

        return ResponseEntity
                .status(401)
                .build();
    }
}

        @PostMapping("/register")
        public ResponseEntity<?> registrar(
                @RequestBody Usuario usuario
        ) {

            return authService.registrar(
                    usuario
            );
        }
}