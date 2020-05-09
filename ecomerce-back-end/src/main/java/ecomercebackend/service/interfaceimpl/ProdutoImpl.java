package ecomercebackend.service.interfaceimpl;

import ecomercebackend.models.entity.Produto;
import ecomercebackend.repository.ProdutoRepositoty;
import ecomercebackend.service.interfaces.ProdutoInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoImpl implements ProdutoInterface {

    @Autowired

    ProdutoRepositoty produtoRepository;

    @Override
    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    @Override
    public Produto findByID(Integer codigo) {
        return produtoRepository.findById(codigo).get();
    }

    @Override
    public Produto save(Produto produto) {
        return produtoRepository.save(produto);
    }
}
