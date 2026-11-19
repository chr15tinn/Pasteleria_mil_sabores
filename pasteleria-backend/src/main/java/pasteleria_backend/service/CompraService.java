package pasteleria_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import pasteleria_backend.dto.CompraRequest;
import pasteleria_backend.model.Boleta;
import pasteleria_backend.model.DetalleBoleta;
import pasteleria_backend.model.Producto;
import pasteleria_backend.model.Usuario;
import pasteleria_backend.repository.BoletaRepository;
import pasteleria_backend.repository.DetalleBoletaRepository;
import pasteleria_backend.repository.ProductoRepository;
import pasteleria_backend.repository.UsuarioRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class CompraService {

    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final BoletaRepository boletaRepository;
    private final DetalleBoletaRepository detalleBoletaRepository;


    public CompraService(
            UsuarioRepository usuarioRepository,
            ProductoRepository productoRepository,
            BoletaRepository boletaRepository,
            DetalleBoletaRepository detalleBoletaRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.productoRepository = productoRepository;
        this.boletaRepository = boletaRepository;
        this.detalleBoletaRepository = detalleBoletaRepository;
    }


    @Transactional
    public Boleta realizarCompra(
            String email,
            CompraRequest request
    ) {

        Usuario usuario =
                usuarioRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Usuario no encontrado"
                                )
                        );


        if (
                request.getProductos() == null ||
                request.getProductos().isEmpty()
        ) {
            throw new RuntimeException(
                    "La compra no contiene productos"
            );
        }


        BigDecimal total =
                BigDecimal.ZERO;


        /*
         * Primero comprobamos productos,
         * cantidades y stock.
         */
        for (
                CompraRequest.ItemCompra item :
                request.getProductos()
        ) {

            Producto producto =
                    productoRepository
                            .findById(
                                    item.getProductoId()
                            )
                            .orElseThrow(
                                    () ->
                                            new RuntimeException(
                                                    "Producto no encontrado: "
                                                            + item.getProductoId()
                                            )
                            );


            if (
                    item.getCantidad() == null ||
                    item.getCantidad() <= 0
            ) {
                throw new RuntimeException(
                        "Cantidad inválida para "
                                + producto.getNombre()
                );
            }


            if (
                    producto.getStock() == null ||
                    producto.getStock()
                            < item.getCantidad()
            ) {
                throw new RuntimeException(
                        "Stock insuficiente para "
                                + producto.getNombre()
                );
            }


            BigDecimal subtotal =
                    producto
                            .getPrecio()
                            .multiply(
                                    BigDecimal.valueOf(
                                            item.getCantidad()
                                    )
                            );


            total =
                    total.add(subtotal);
        }


        /*
         * Crear la boleta.
         */
        Boleta boleta =
                new Boleta();

        boleta.setFecha(
                LocalDateTime.now()
        );

        boleta.setTotal(total);

        boleta.setEstado(
                "Pedido recibido"
        );

        boleta.setDireccion(
                request.getDireccion()
        );

        boleta.setMedioPago(
                request.getMedioPago()
        );

        boleta.setUsuario(usuario);


        Boleta boletaGuardada =
                boletaRepository.save(
                        boleta
                );


        /*
         * Crear detalles y descontar stock.
         */
        for (
                CompraRequest.ItemCompra item :
                request.getProductos()
        ) {

            Producto producto =
                    productoRepository
                            .findById(
                                    item.getProductoId()
                            )
                            .orElseThrow();


            BigDecimal precioUnitario =
                    producto.getPrecio();


            BigDecimal subtotal =
                    precioUnitario.multiply(
                            BigDecimal.valueOf(
                                    item.getCantidad()
                            )
                    );


            DetalleBoleta detalle =
                    new DetalleBoleta();

            detalle.setBoleta(
                    boletaGuardada
            );

            detalle.setProducto(
                    producto
            );

            detalle.setCantidad(
                    item.getCantidad()
            );

            detalle.setPrecioUnitario(
                    precioUnitario
            );

            detalle.setSubtotal(
                    subtotal
            );


            detalleBoletaRepository.save(
                    detalle
            );


            producto.setStock(
                    producto.getStock()
                            - item.getCantidad()
            );


            productoRepository.save(
                    producto
            );
        }


        return boletaGuardada;
    }
}