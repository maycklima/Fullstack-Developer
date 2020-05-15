import { Injectable } from '@angular/core';
import { CarrinhoProduto } from '../models/produtos-carrinho.model';
import { CarrinhoValores } from '../models/carrinho-valores.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from './../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  produtos: CarrinhoProduto[] = [];
  produtosSelecionados: CarrinhoValores[] = [];
  private produtosSubject: BehaviorSubject<CarrinhoProduto[]>;


  keyStorage: any = 'produtos_carrinho';

  constructor() {
    const produtosSalvos: CarrinhoProduto[] = JSON.parse(localStorage.getItem(this.keyStorage)) || [];
    this.produtosSubject = new BehaviorSubject<CarrinhoProduto[]>(produtosSalvos);

    this.produtosSubject.subscribe((produtos) => {
      localStorage.setItem(this.keyStorage, JSON.stringify(produtos));
    });
  }

  addProduto(produto: CarrinhoProduto) {
    produto.quantidade = 1;
    produto.valorTotal = produto.precoUnitario;
    if (!this.produtos.find(x => x.codigo === produto.codigo)) {
      this.produtos.push(produto);
      this.produtosSubject.next(this.produtos);
    }
  }

  getProdutosSelecionados() {
    return new Observable<CarrinhoValores[]>(observador => {
      setTimeout(() => {
        observador.next(this.produtosSelecionados);
      }, 2000);
    });
  }

  getProdutos() {
    return this.produtosSubject.asObservable();
  }

  limparCarrinho() {
    // tslint:disable-next-line: prefer-for-of
    this.produtos = [];
    this.produtosSubject.next(this.produtos);
  }

  setProdutosSelecionados(produtosSelecionados: CarrinhoValores[]) {
    this.produtosSelecionados = produtosSelecionados;
  }
}
