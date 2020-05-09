package ecomercebackend.service.interfaces;

import ecomercebackend.models.entity.Pedido;

import java.util.List;

public interface PedidoInterface {

    List<Pedido> findAll();
    Pedido findByID(Integer codigo);
    Pedido save(Pedido pedido);
}
