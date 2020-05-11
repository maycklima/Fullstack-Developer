package ecomercebackend.controller;

import ecomercebackend.models.entity.Cliente;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/ecomerce")
public class ControllerTest {

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
