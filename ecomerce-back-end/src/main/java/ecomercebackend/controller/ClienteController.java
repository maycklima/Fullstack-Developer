package ecomercebackend.controller;

import ecomercebackend.models.Cliente;
import ecomercebackend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(name = "clientes", path = "/clientes")
@ResponseBody
public class ClienteController
{
    @Autowired
    ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> listarClientes(){return clienteRepository.findAll();}

    @PostMapping
    public Cliente cadastrarCliente(@RequestBody Cliente cliente){return clienteRepository.save(cliente);}

    @DeleteMapping("/{codigo}")
    public Cliente removerCliente(@PathVariable Integer codigo){
        Optional<Cliente> cliente = clienteRepository.findById(codigo);
        clienteRepository.delete(cliente.get());
        return cliente.get();
    }
}
