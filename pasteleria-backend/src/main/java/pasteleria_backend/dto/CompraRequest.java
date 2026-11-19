package pasteleria_backend.dto;

import java.util.List;

public class CompraRequest {

    private String direccion;
    private String medioPago;
    private List<ItemCompra> productos;


    public CompraRequest() {
    }


    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getMedioPago() {
        return medioPago;
    }

    public void setMedioPago(String medioPago) {
        this.medioPago = medioPago;
    }

    public List<ItemCompra> getProductos() {
        return productos;
    }

    public void setProductos(List<ItemCompra> productos) {
        this.productos = productos;
    }


    public static class ItemCompra {

        private Long productoId;
        private Integer cantidad;


        public ItemCompra() {
        }


        public Long getProductoId() {
            return productoId;
        }

        public void setProductoId(Long productoId) {
            this.productoId = productoId;
        }

        public Integer getCantidad() {
            return cantidad;
        }

        public void setCantidad(Integer cantidad) {
            this.cantidad = cantidad;
        }
    }
}