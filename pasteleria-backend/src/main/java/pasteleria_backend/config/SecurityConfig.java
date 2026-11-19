package pasteleria_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import pasteleria_backend.security.JwtAuthenticationFilter;

import java.util.List;


@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;


    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173"
                )
        );


        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );


        configuration.setAllowedHeaders(
                List.of("*")
        );


        configuration.setAllowCredentials(
                true
        );


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )

                .csrf(csrf ->
                        csrf.disable()
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth


                        // =========================
                        // CORS
                        // =========================

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        )
                        .permitAll()


                        // =========================
                        // AUTH Y SWAGGER
                        // =========================

                        .requestMatchers(
                                "/api/v1/auth/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        )
                        .permitAll()


                        // =========================
                        // PRODUCTOS
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/productos",
                                "/api/v1/productos/**"
                        )
                        .permitAll()


                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/productos",
                                "/api/v1/productos/**"
                        )
                        .hasAuthority("ADMIN")


                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/productos/**"
                        )
                        .hasAuthority("ADMIN")


                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/productos/**"
                        )
                        .hasAuthority("ADMIN")


                        // =========================
                        // CATEGORÍAS
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/categorias",
                                "/api/v1/categorias/**"
                        )
                        .permitAll()


                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/categorias",
                                "/api/v1/categorias/**"
                        )
                        .hasAuthority("ADMIN")


                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/categorias/**"
                        )
                        .hasAuthority("ADMIN")


                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/categorias/**"
                        )
                        .hasAuthority("ADMIN")


                        // =========================
                        // COMPRA CLIENTE
                        // =========================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/compras"
                        )
                        .hasAuthority("CLIENTE")


                        // =========================
                        // MIS BOLETAS - CLIENTE
                        // IMPORTANTE:
                        // debe ir ANTES de
                        // /api/v1/boletas/**
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/boletas/mis-boletas"
                        )
                        .hasAuthority("CLIENTE")


                        // =========================
                        // BOLETAS
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/boletas",
                                "/api/v1/boletas/**"
                        )
                        .hasAnyAuthority(
                                "ADMIN",
                                "VENDEDOR"
                        )


                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/boletas",
                                "/api/v1/boletas/**"
                        )
                        .hasAnyAuthority(
                                "ADMIN",
                                "CLIENTE"
                        )


                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/boletas/**"
                        )
                        .hasAuthority("ADMIN")


                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/boletas/**"
                        )
                        .hasAuthority("ADMIN")


                        // =========================
                        // DETALLES DE BOLETA
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/v1/detalles-boleta",
                                "/api/v1/detalles-boleta/**"
                        )
                        .hasAnyAuthority(
                                "ADMIN",
                                "VENDEDOR"
                        )


                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/v1/detalles-boleta",
                                "/api/v1/detalles-boleta/**"
                        )
                        .hasAnyAuthority(
                                "ADMIN",
                                "CLIENTE"
                        )


                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/v1/detalles-boleta/**"
                        )
                        .hasAuthority("ADMIN")


                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/v1/detalles-boleta/**"
                        )
                        .hasAuthority("ADMIN")


                        // =========================
                        // USUARIOS
                        // =========================

                        .requestMatchers(
                                "/api/v1/usuarios",
                                "/api/v1/usuarios/**"
                        )
                        .hasAuthority("ADMIN")


                        // =========================
                        // RESTO
                        // =========================

                        .anyRequest()
                        .authenticated()
                )


                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }
}