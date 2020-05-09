package ecomercebackend.repository;

import ecomercebackend.models.entity.Produto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ProtudoTest {

    @Autowired
    private ProdutoRepositoty produtoRepositoty;

    @Test
    public void testarProdutoRepository() {
        Produto p = new Produto();

        p.setNome("Produto 1");
        p.setPrecoUnitario("10.00");

        Produto p2 = new Produto();

        p2.setNome("Produto 2");
        p2.setPrecoUnitario("20.00");

        produtoRepositoty.save(p);
        produtoRepositoty.save(p2);

    }
}
