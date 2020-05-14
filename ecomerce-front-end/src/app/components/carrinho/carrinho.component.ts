import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CarrinhoProduto } from 'src/app/models/produtos-carrinho.model';
import { CarrinhoValores } from 'src/app/models/carrinho-valores.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  constructor(private carrinhoService: CarrinhoService) { }

  iconCarrinho = '/assets/icones/icone-carrinho.png';
  produtos: CarrinhoProduto[] = [];
  impressaoProduto;
  produtosComValorCalculado: CarrinhoValores[] = [];

  @Output() carrinhoDeCompras = new EventEmitter();

  ngOnInit() {
    this.carrinhoService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    },
      error => {
        console.log(error);
      },
      () => {
        console.log('Dados carregados');
      }
    );
  }

  onProdutoSelecionado(evento) {
    this.carrinhoService.addProduto(evento.produto);
    this.impressaoProduto = evento;
  }

  onProdutoCalculado(valores) {
    if (this.produtosComValorCalculado.length === 0) {
      this.adicionarProduto(valores);
    } else {

      const valor = this.produtosComValorCalculado.find(x => x.codigoProduto === valores.codigo);
      if (valor !== undefined) {
        const newList = this.produtosComValorCalculado.filter(x => x.codigoProduto !== valor.codigoProduto);
        this.produtosComValorCalculado = newList;
        this.adicionarProduto(valores);
      } else {
        this.adicionarProduto(valores);
      }
    }
  }

  adicionarProduto(valores) {
    const valorTotal = new CarrinhoValores();
    valorTotal.codigoProduto = valores.codigo;
    valorTotal.valorTotalDeItens = Number(valores.valorTotal);
    valorTotal.quantidadeTotalDeItens = Number(valores.quantidade);
    this.produtosComValorCalculado.push(valorTotal);
    console.log(this.produtosComValorCalculado);
    this.carrinhoDeCompras.emit({ carrinho: this.produtosComValorCalculado });
    this.carrinhoService.setProdutosSelecionados(this.produtosComValorCalculado);
  }

}