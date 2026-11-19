package pasteleria_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "Pasteleria1000SaboresClaveJWTSegura2026Christian";

    private SecretKey obtenerClave() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes(
                        StandardCharsets.UTF_8
                )
        );
    }

    public String generarToken(
            String email,
            String rol
    ) {

        return Jwts.builder()
                .claims(
                        Map.of(
                                "rol",
                                rol
                        )
                )
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000L * 60 * 60 * 8
                        )
                )
                .signWith(obtenerClave())
                .compact();
    }

    public String obtenerEmail(
            String token
    ) {

        return obtenerClaims(token)
                .getSubject();
    }

    public String obtenerRol(
            String token
    ) {

        return obtenerClaims(token)
                .get(
                        "rol",
                        String.class
                );
    }

    public boolean esTokenValido(
            String token
    ) {

        try {

            Claims claims =
                    obtenerClaims(token);

            return claims.getExpiration() != null
                    && claims
                    .getExpiration()
                    .after(new Date());

        } catch (Exception e) {

            return false;
        }
    }

    private Claims obtenerClaims(
            String token
    ) {

        return Jwts.parser()
                .verifyWith(obtenerClave())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}