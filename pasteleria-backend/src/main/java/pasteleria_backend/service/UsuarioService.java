package pasteleria_backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pasteleria_backend.model.Usuario;
import pasteleria_backend.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;


@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;


    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder
    ) {

        this.usuarioRepository =
                usuarioRepository;

        this.passwordEncoder =
                passwordEncoder;
    }


    public List<Usuario> listarUsuarios() {

        return usuarioRepository.findAll();
    }


    public Optional<Usuario> buscarPorId(
            Long id
    ) {

        return usuarioRepository.findById(id);
    }


    public Usuario guardarUsuario(
            Usuario usuario
    ) {

        if (
                usuarioRepository.existsByEmail(
                        usuario.getEmail()
                )
        ) {

            throw new RuntimeException(
                    "El correo ya se encuentra registrado"
            );
        }


        String passwordCifrada =
                passwordEncoder.encode(
                        usuario.getPassword()
                );


        usuario.setPassword(
                passwordCifrada
        );


        return usuarioRepository.save(
                usuario
        );
    }


    public Usuario actualizarUsuario(
            Long id,
            Usuario usuarioActualizado
    ) {

        Usuario usuario =
                usuarioRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Usuario no encontrado"
                                )
                        );


        usuario.setNombre(
                usuarioActualizado.getNombre()
        );


        usuario.setEmail(
                usuarioActualizado.getEmail()
        );


        /*
         * Solo ciframos la contraseña
         * si se envía una nueva.
         */
        if (
                usuarioActualizado.getPassword() != null
                &&
                !usuarioActualizado
                        .getPassword()
                        .isBlank()
        ) {

            usuario.setPassword(
                    passwordEncoder.encode(
                            usuarioActualizado
                                    .getPassword()
                    )
            );
        }


        usuario.setRol(
                usuarioActualizado.getRol()
        );


        usuario.setTelefono(
                usuarioActualizado.getTelefono()
        );


        return usuarioRepository.save(
                usuario
        );
    }


    public void eliminarUsuario(
            Long id
    ) {

        if (
                !usuarioRepository.existsById(id)
        ) {

            throw new RuntimeException(
                    "Usuario no encontrado"
            );
        }


        usuarioRepository.deleteById(id);
    }
}