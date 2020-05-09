package ecomercebackend.modelsTest;

import ecomercebackend.models.entity.Cliente;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ClienteTest {

    @Test
    public void testarCliente() {
        Cliente c = new Cliente();
        c.setCodigo(1);
        c.setNome("Cliente 1");

        System.out.println(c);
    }
}
