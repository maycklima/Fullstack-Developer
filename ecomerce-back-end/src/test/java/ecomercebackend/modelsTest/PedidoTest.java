package ecomercebackend.modelsTest;

import ecomercebackend.models.entity.Cliente;
import ecomercebackend.models.entity.Pedido;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PedidoTest {

    @Test
    public void testarPedido() {

            Cliente c = new Cliente();
            c.setCodigo(1);
            c.setNome("Cliente 1");

            Pedido p = new Pedido();
            p.setNumero(123);
            p.setCliente(c);
            p.setQntItens("3");
            p.setValorFrete("12");
            p.setValorTotal("100");

            System.out.println(p);



    }
}
