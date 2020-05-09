package ecomercebackend.modelsTest;

import ecomercebackend.models.entity.Produto;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ProdutoTest {

    @Test
    public void testarProduto() {
        Produto p = new Produto();
        p.setCodigo(1);
        p.setNome("Produto 1");
        p.setPrecoUnitario("10.00");

        System.out.println(p);
    }
}
