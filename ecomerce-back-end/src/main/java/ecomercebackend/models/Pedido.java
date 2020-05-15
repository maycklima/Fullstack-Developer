package ecomercebackend.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Pedido {

    @Id
    private int numero;

    @ManyToOne
    @JoinColumn(nullable = false)

    private Cliente cliente;

    private String qntItens;

    private String valorTotal;

    private String valorFrete;
}
