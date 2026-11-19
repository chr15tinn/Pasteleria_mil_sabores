package pasteleria_backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import pasteleria_backend.model.Usuario;
import pasteleria_backend.repository.UsuarioRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (!usuarioRepository.existsByEmail("admin@1000sabores.cl")) {

            Usuario admin = new Usuario();

            admin.setNombre("Administrador");
            admin.setEmail("admin@1000sabores.cl");
            admin.setPassword(
                    passwordEncoder.encode("Admin123")
            );
            admin.setRol("ADMIN");
            admin.setTelefono("900000001");

            usuarioRepository.save(admin);
        }

        if (!usuarioRepository.existsByEmail("vendedor@1000sabores.cl")) {

            Usuario vendedor = new Usuario();

            vendedor.setNombre("Vendedor");
            vendedor.setEmail("vendedor@1000sabores.cl");
            vendedor.setPassword(
                    passwordEncoder.encode("Vendedor123")
            );
            vendedor.setRol("VENDEDOR");
            vendedor.setTelefono("900000002");

            usuarioRepository.save(vendedor);
        }
    }
}