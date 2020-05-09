package ecomercebackend.repository;

import ecomercebackend.models.entity.Cliente;
import ecomercebackend.models.entity.Produto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ClienteTest {

    @Autowired
    private ClienteRepository clienteRepositoty;

    @Test
    public void testarClienteRepository() {

        Cliente c = new Cliente();
        c.setNome("Cliente 1");

        Cliente c2 = new Cliente();
        c2.setNome("Cliente 2");

        Cliente c3 = new Cliente();
        c3.setNome("Cliente 3");

        Cliente c4 = new Cliente();
        c4.setNome("Cliente 4");

        Cliente c5 = new Cliente();
        c5.setNome("Cliente 5");


        clienteRepositoty.save(c);
        clienteRepositoty.save(c2);
        clienteRepositoty.save(c3);
        clienteRepositoty.save(c4);
        clienteRepositoty.save(c5);

    }
}
