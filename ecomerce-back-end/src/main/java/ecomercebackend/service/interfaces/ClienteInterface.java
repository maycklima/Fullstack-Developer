package ecomercebackend.service.interfaces;

import ecomercebackend.models.entity.Cliente;

import java.util.List;

public interface ClienteInterface {

    List<Cliente> findAll();
    Cliente findByID(Integer codigo);
    Cliente save(Cliente cliente);
}
