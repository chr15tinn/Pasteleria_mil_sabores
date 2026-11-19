package pasteleria_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pasteleria_backend.model.Boleta;

import java.util.List;

public interface BoletaRepository
        extends JpaRepository<Boleta, Long> {

    List<Boleta> findByUsuarioEmailOrderByFechaDesc(
            String email
    );
}