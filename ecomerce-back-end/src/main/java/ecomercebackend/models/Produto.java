package ecomercebackend.models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Entity
public class Produto {

    @Id
    private int codigo;

    @NotBlank
    private String nome;

    @NotBlank
    private String precoUnitario;
}
