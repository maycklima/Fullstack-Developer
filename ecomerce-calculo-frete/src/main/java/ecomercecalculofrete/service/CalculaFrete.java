package ecomercecalculofrete.service;


import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CalculaFrete {

    public double valorFreteCalculado(int totalItens)
    {
        var frete = (Math.random() * ((9 - 5) + 1)) + 5;
        System.out.println(frete);

        return frete * totalItens;
    }
}
