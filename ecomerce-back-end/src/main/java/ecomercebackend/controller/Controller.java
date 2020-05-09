package ecomercebackend.controller;

import ecomercebackend.models.entity.Cliente;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ecomerce")
public class Controller {

    @RequestMapping("/ola")
    public String ola(){

        return "Hello World! Backend worksss!";
    }

    @RequestMapping("/cliente")
    public Cliente cliente(){

        Cliente e = new Cliente();
        e.setCodigo(Short.parseShort("1"));
        e.setNome("Mayck Lima Gato");

        return e;
    }
}
