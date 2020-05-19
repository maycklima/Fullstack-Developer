import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CarrinhoProduto } from 'src/app/models/produtos-carrinho.model';
import { CarrinhoValores } from 'src/app/models/carrinho-valores.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { empty } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  constructor(private carrinhoService: CarrinhoService, private snackBar: MatSnackBar) { }

  iconCarrinho = 'assets/icones/icone-carrinho.png';
  produtos: CarrinhoProduto[] = [];
  produtosComValorCalculado: CarrinhoValores[] = [];

  @Output() carrinhoDeCompras = new EventEmitter();

  ngOnInit() {
    this.populaCarrinho();
  }

  // metodo responsavel por popular o carrinho com os produtos ja existentes
  populaCarrinho() {
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

  // evento ao selecionar um produto no campo "produtos"
  onProdutoSelecionado(evento) {
    this.carrinhoService.addProduto(evento.produto);
  }

  // metodo para remover um produto


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

  // metodo para adicionar um produto ao carrinho.service
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
