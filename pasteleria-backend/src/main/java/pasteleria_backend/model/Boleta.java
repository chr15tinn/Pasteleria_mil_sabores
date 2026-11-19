package pasteleria_backend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "boleta")
public class Boleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal total;

    @Column(nullable = false, length = 30)
    private String estado;

    @Column(length = 200)
    private String direccion;

    @Column(length = 50)
    private String medioPago;

    @ManyToOne
    @JoinColumn(
            name = "usuario_id",
            nullable = false
    )
    private Usuario usuario;


    public Boleta() {
    }


    public Boleta(
            Long id,
            LocalDateTime fecha,
            BigDecimal total,
            String estado,
            String direccion,
            String medioPago,
            Usuario usuario
    ) {
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.estado = estado;
        this.direccion = direccion;
        this.medioPago = medioPago;
        this.usuario = usuario;
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public LocalDateTime getFecha() {
        return fecha;
    }


    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }


    public BigDecimal getTotal() {
        return total;
    }


    public void setTotal(BigDecimal total) {
        this.total = total;
    }


    public String getEstado() {
        return estado;
    }


    public void setEstado(String estado) {
        this.estado = estado;
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


    public Usuario getUsuario() {
        return usuario;
    }


    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}