package pasteleria_backend.service;

import org.springframework.stereotype.Service;

import pasteleria_backend.dto.PedidoResponse;
import pasteleria_backend.model.Boleta;
import pasteleria_backend.model.DetalleBoleta;
import pasteleria_backend.model.Usuario;
import pasteleria_backend.repository.BoletaRepository;
import pasteleria_backend.repository.DetalleBoletaRepository;
import pasteleria_backend.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BoletaService {

    private final BoletaRepository boletaRepository;
    private final UsuarioRepository usuarioRepository;
    private final DetalleBoletaRepository detalleBoletaRepository;


    public BoletaService(
            BoletaRepository boletaRepository,
            UsuarioRepository usuarioRepository,
            DetalleBoletaRepository detalleBoletaRepository
    ) {
        this.boletaRepository = boletaRepository;
        this.usuarioRepository = usuarioRepository;
        this.detalleBoletaRepository = detalleBoletaRepository;
    }


    public List<Boleta> listarBoletas() {
        return boletaRepository.findAll();
    }


    public Optional<Boleta> buscarPorId(Long id) {
        return boletaRepository.findById(id);
    }


    public Boleta guardarBoleta(
            Boleta boleta
    ) {

        if (
                boleta.getUsuario() == null
                || boleta.getUsuario().getId() == null
        ) {
            throw new RuntimeException(
                    "Debe indicar un usuario"
            );
        }


        Usuario usuario =
                usuarioRepository
                        .findById(
                                boleta
                                        .getUsuario()
                                        .getId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Usuario no encontrado"
                                )
                        );


        boleta.setUsuario(
                usuario
        );


        return boletaRepository.save(
                boleta
        );
    }


    public Boleta actualizarBoleta(
            Long id,
            Boleta boletaActualizada
    ) {

        Boleta boleta =
                boletaRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Boleta no encontrada"
                                )
                        );


        if (
                boletaActualizada.getUsuario() == null
                || boletaActualizada
                        .getUsuario()
                        .getId() == null
        ) {
            throw new RuntimeException(
                    "Debe indicar un usuario"
            );
        }


        Usuario usuario =
                usuarioRepository
                        .findById(
                                boletaActualizada
                                        .getUsuario()
                                        .getId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Usuario no encontrado"
                                )
                        );


        boleta.setFecha(
                boletaActualizada.getFecha()
        );

        boleta.setTotal(
                boletaActualizada.getTotal()
        );

        boleta.setEstado(
                boletaActualizada.getEstado()
        );

        boleta.setDireccion(
                boletaActualizada.getDireccion()
        );

        boleta.setMedioPago(
                boletaActualizada.getMedioPago()
        );

        boleta.setUsuario(
                usuario
        );


        return boletaRepository.save(
                boleta
        );
    }


    public void eliminarBoleta(
            Long id
    ) {

        if (
                !boletaRepository.existsById(id)
        ) {
            throw new RuntimeException(
                    "Boleta no encontrada"
            );
        }


        boletaRepository.deleteById(
                id
        );
    }


    public List<PedidoResponse> obtenerPedidosCliente(
            String email
    ) {

        return boletaRepository
                .findByUsuarioEmailOrderByFechaDesc(
                        email
                )
                .stream()
                .map(boleta -> {

                    PedidoResponse response =
                            new PedidoResponse();


                    response.setId(
                            boleta.getId()
                    );

                    response.setFecha(
                            boleta.getFecha()
                    );

                    response.setTotal(
                            boleta.getTotal()
                    );

                    response.setEstado(
                            boleta.getEstado()
                    );

                    response.setDireccion(
                            boleta.getDireccion()
                    );

                    response.setMedioPago(
                            boleta.getMedioPago()
                    );


                    List<DetalleBoleta> detalles =
                            detalleBoletaRepository
                                    .findByBoletaId(
                                            boleta.getId()
                                    );


                    List<PedidoResponse.ProductoPedido>
                            productos =
                            detalles
                                    .stream()
                                    .map(detalle -> {

                                        PedidoResponse.ProductoPedido producto =
                                                new PedidoResponse.ProductoPedido();


                                        producto.setId(
                                                detalle
                                                        .getProducto()
                                                        .getId()
                                        );

                                        producto.setNombre(
                                                detalle
                                                        .getProducto()
                                                        .getNombre()
                                        );

                                        producto.setCantidad(
                                                detalle
                                                        .getCantidad()
                                        );

                                        producto.setPrecio(
                                                detalle
                                                        .getPrecioUnitario()
                                        );

                                        producto.setSubtotal(
                                                detalle
                                                        .getSubtotal()
                                        );


                                        return producto;

                                    })
                                    .toList();


                    response.setProductos(
                            productos
                    );


                    return response;

                })
                .toList();
    }
}