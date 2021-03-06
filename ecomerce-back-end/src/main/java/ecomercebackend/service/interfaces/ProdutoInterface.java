package ecomercebackend.service.interfaces;

import ecomercebackend.models.Produto;

import java.util.List;

public interface ProdutoInterface {

    List<Produto> findAll();
    Produto findByID(Integer codigo);
    Produto save(Produto produto);
}
