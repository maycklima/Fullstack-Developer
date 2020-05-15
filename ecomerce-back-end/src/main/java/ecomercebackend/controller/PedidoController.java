package ecomercebackend.controller;

import ecomercebackend.models.Pedido;
import ecomercebackend.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(name = "pedidos", path = "/pedidos")
@ResponseBody
public class PedidoController
{
    @Autowired
    PedidoRepository pedidoRepository;

    @GetMapping
    public List<Pedido> listarPedidos(){return pedidoRepository.findAll();}

    @PostMapping
    public Pedido cadastrarPedido(@RequestBody Pedido pedido){
        System.out.println(pedido);
        return pedidoRepository.save(pedido);}

    @DeleteMapping("/{codigo}")
    public Pedido removerCliente(@PathVariable Integer codigo){
        Optional<Pedido> pedido = pedidoRepository.findById(codigo);
        pedidoRepository.delete(pedido.get());
        return pedido.get();
}
}
