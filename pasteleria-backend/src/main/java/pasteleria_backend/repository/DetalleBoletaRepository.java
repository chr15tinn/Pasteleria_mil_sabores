package pasteleria_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pasteleria_backend.model.DetalleBoleta;

import java.util.List;

public interface DetalleBoletaRepository
        extends JpaRepository<DetalleBoleta, Long> {

    List<DetalleBoleta> findByBoletaId(
            Long boletaId
    );
}