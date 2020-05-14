package ecomercecalculofrete.controller;

import ecomercecalculofrete.models.CalculoFrete;
import ecomercecalculofrete.service.CalculaFrete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(name = "frete", path = "/frete")
public class FreteController {

    @Autowired
    CalculaFrete calculaFrete;

    @PostMapping
    public double calculaValorFrete(@RequestBody CalculoFrete calculoFrete) {
        if (calculoFrete.getTotalItens() > 0) {
            return calculaFrete.valorFreteCalculado(calculoFrete.getTotalItens());
        } else return 0;
    }
}
