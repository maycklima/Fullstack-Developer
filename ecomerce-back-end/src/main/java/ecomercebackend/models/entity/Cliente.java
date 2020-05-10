package ecomercebackend.models.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Cliente {

    @Id
    private int codigo;

    @Column(nullable = false)
    private String nome;
}
