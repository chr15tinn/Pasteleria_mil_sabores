package pasteleria_backend.service;

import org.springframework.stereotype.Service;

import pasteleria_backend.model.Categoria;
import pasteleria_backend.model.Producto;
import pasteleria_backend.repository.CategoriaRepository;
import pasteleria_backend.repository.ProductoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;


    public ProductoService(
            ProductoRepository productoRepository,
            CategoriaRepository categoriaRepository
    ) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }


    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }


    public Optional<Producto> buscarPorId(
            Long id
    ) {
        return productoRepository.findById(id);
    }


    public Producto guardarProducto(
            Producto producto
    ) {

        if (
                producto.getCategoria() == null
                || producto.getCategoria().getId() == null
        ) {
            throw new RuntimeException(
                    "Debe indicar una categoría"
            );
        }


        Categoria categoria =
                categoriaRepository
                        .findById(
                                producto
                                        .getCategoria()
                                        .getId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Categoría no encontrada"
                                )
                        );


        producto.setCategoria(categoria);


        return productoRepository.save(
                producto
        );
    }


    public Producto actualizarProducto(
            Long id,
            Producto productoActualizado
    ) {

        Producto producto =
                productoRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Producto no encontrado"
                                )
                        );


        if (
                productoActualizado.getCategoria() == null
                || productoActualizado
                        .getCategoria()
                        .getId() == null
        ) {
            throw new RuntimeException(
                    "Debe indicar una categoría"
            );
        }


        Categoria categoria =
                categoriaRepository
                        .findById(
                                productoActualizado
                                        .getCategoria()
                                        .getId()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Categoría no encontrada"
                                )
                        );


        producto.setNombre(
                productoActualizado.getNombre()
        );

        producto.setDescripcion(
                productoActualizado
                        .getDescripcion()
        );

        producto.setPrecio(
                productoActualizado.getPrecio()
        );

        producto.setStock(
                productoActualizado.getStock()
        );

        producto.setImagen(
                productoActualizado.getImagen()
        );

        producto.setOferta(
                productoActualizado.getOferta()
        );

        producto.setCategoria(
                categoria
        );


        return productoRepository.save(
                producto
        );
    }


    public void eliminarProducto(
            Long id
    ) {

        if (
                !productoRepository.existsById(id)
        ) {
            throw new RuntimeException(
                    "Producto no encontrado"
            );
        }


        productoRepository.deleteById(id);
    }
}