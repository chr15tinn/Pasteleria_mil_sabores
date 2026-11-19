package pasteleria_backend.service;

import org.springframework.stereotype.Service;

import pasteleria_backend.model.Boleta;
import pasteleria_backend.model.DetalleBoleta;
import pasteleria_backend.model.Producto;
import pasteleria_backend.repository.BoletaRepository;
import pasteleria_backend.repository.DetalleBoletaRepository;
import pasteleria_backend.repository.ProductoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DetalleBoletaService {

    private final DetalleBoletaRepository detalleBoletaRepository;
    private final BoletaRepository boletaRepository;
    private final ProductoRepository productoRepository;


    public DetalleBoletaService(
            DetalleBoletaRepository detalleBoletaRepository,
            BoletaRepository boletaRepository,
            ProductoRepository productoRepository
    ) {
        this.detalleBoletaRepository = detalleBoletaRepository;
        this.boletaRepository = boletaRepository;
        this.productoRepository = productoRepository;
    }


    public List<DetalleBoleta> listarDetalles() {
        return detalleBoletaRepository.findAll();
    }


    public Optional<DetalleBoleta> buscarPorId(
            Long id
    ) {
        return detalleBoletaRepository.findById(id);
    }


    public DetalleBoleta guardarDetalle(
            DetalleBoleta detalleBoleta
    ) {

        if (
                detalleBoleta.getBoleta() == null
                || detalleBoleta.getBoleta().getId() == null
        ) {
            throw new RuntimeException(
                    "Debe indicar una boleta"
            );
        }


        if (
                detalleBoleta.getProducto() == null
                || detalleBoleta.getProducto().getId() == null
        ) {
            throw new RuntimeException(
                    "Debe indicar un producto"
            );
        }


        Boleta boleta =
                boletaRepository
                        .findById(
                                detalleBoleta
                                        .getBoleta()
                                        .getId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Boleta no encontrada"
                                )
                        );


        Producto producto =
                productoRepository
                        .findById(
                                detalleBoleta
                                        .getProducto()
                                        .getId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Producto no encontrado"
                                )
                        );


        detalleBoleta.setBoleta(
                boleta
        );

        detalleBoleta.setProducto(
                producto
        );


        return detalleBoletaRepository.save(
                detalleBoleta
        );
    }


    public DetalleBoleta actualizarDetalle(
            Long id,
            DetalleBoleta detalleActualizado
    ) {

        DetalleBoleta detalle =
                detalleBoletaRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Detalle de boleta no encontrado"
                                )
                        );


        if (
                detalleActualizado.getBoleta() == null
                || detalleActualizado
                        .getBoleta()
                        .getId() == null
        ) {
            throw new RuntimeException(
                    "Debe indicar una boleta"
            );
        }


        if (
                detalleActualizado.getProducto() == null
                || detalleActualizado
                        .getProducto()
                        .getId() == null
        ) {
            throw new RuntimeException(
                    "Debe indicar un producto"
            );
        }


        Boleta boleta =
                boletaRepository
                        .findById(
                                detalleActualizado
                                        .getBoleta()
                                        .getId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Boleta no encontrada"
                                )
                        );


        Producto producto =
                productoRepository
                        .findById(
                                detalleActualizado
                                        .getProducto()
                                        .getId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Producto no encontrado"
                                )
                        );


        detalle.setCantidad(
                detalleActualizado.getCantidad()
        );

        detalle.setPrecioUnitario(
                detalleActualizado.getPrecioUnitario()
        );

        detalle.setSubtotal(
                detalleActualizado.getSubtotal()
        );

        detalle.setBoleta(
                boleta
        );

        detalle.setProducto(
                producto
        );


        return detalleBoletaRepository.save(
                detalle
        );
    }


    public void eliminarDetalle(
            Long id
    ) {

        if (
                !detalleBoletaRepository.existsById(id)
        ) {
            throw new RuntimeException(
                    "Detalle de boleta no encontrado"
            );
        }


        detalleBoletaRepository.deleteById(id);
    }
}