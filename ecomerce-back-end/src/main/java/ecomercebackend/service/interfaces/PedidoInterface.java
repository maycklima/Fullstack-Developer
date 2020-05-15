package ecomercebackend.service.interfaces;

import ecomercebackend.models.Pedido;

import java.util.List;

public interface PedidoInterface {

    List<Pedido> findAll();
    Pedido findByID(Integer codigo);
    Pedido save(Pedido pedido);
}
