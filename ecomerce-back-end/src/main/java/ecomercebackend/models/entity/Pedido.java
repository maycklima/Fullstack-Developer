package ecomercebackend.models.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int numero;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Cliente cliente;

    private int qntItens;

    private String valorTotal;

    private String valorFrete;
}
