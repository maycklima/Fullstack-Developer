package ecomercebackend.controller;

import ecomercebackend.models.Produto;
import ecomercebackend.repository.ProdutoRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(name = "produtos", path = "/produtos")
@ResponseBody
public class ProdutoController {
    @Autowired
    ProdutoRepositoty produtoRepository;

    @GetMapping
    public List<Produto> listarProdutos(){return produtoRepository.findAll();}

    @PostMapping
    public Produto cadastrarProduto(@RequestBody Produto produto){return produtoRepository.save(produto);}

    @DeleteMapping("/{codigo}")
    public Produto removerProduto(@PathVariable Integer codigo) {
        Optional<Produto> produto = produtoRepository.findById(codigo);
        produtoRepository.delete(produto.get());
        return produto.get();
    }


}
