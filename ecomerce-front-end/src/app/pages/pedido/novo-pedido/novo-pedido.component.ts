import { Component, OnInit, OnChanges, AfterContentInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CarrinhoValores } from 'src/app/models/carrinho-valores.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.model';
import { CalculoFreteService } from 'src/app/services/calculo-frete.service';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.css']
})
export class NovoPedidoComponent implements OnInit, AfterViewChecked {

  constructor(private carrinhoService: CarrinhoService,
    // tslint:disable-next-line: align
    private pedidoService: PedidoService,
    // tslint:disable-next-line: align
    private router: Router,
    // tslint:disable-next-line: align
    private calculoFreteService: CalculoFreteService,
    // tslint:disable-next-line: align
    private changeDetector: ChangeDetectorRef) { }

  iconCliente = '/assets/icones/icone-cliente.png';
  iconCarrinho = '/assets/icones/icone-carrinho.png';
  iconTotal = '/assets/icones/icone-total.png';
  impressaoCliente: any;
  erro = false;

  valorTotal: any;
  valorItens: number;
  pedido = new Pedido();
  qntProdutos: number;
  valorFreteTemp: number;

  produtos: CarrinhoValores[] = [];

  ngOnInit(): void {
    this.pedido.numero = Math.floor(10000000 + Math.random() * 90000000);
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }


  onClienteSelecionado(clienteSelecionado) {
    this.impressaoCliente = clienteSelecionado.cliente.nome;
    this.pedido.cliente = clienteSelecionado.cliente;
  }

  onProdutoSelecionado(evento) {
    this.carrinhoService.addProduto(evento.produto);
    console.log(evento);
  }

  onCarrinhoDeComprasPreenchido(produtosCarrinho) {
    this.produtos = produtosCarrinho.carrinho;
    this.calcularPrecoTotal(this.produtos);
  }

  limparCarrinho() {
    this.carrinhoService.limparProdutos();
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  calcularPrecoTotal(produtos: CarrinhoValores[]) {
    let valorTotal = 0;
    let totalItens = 0;
    this.carrinhoService.getProdutosSelecionados().subscribe(valor => {
      produtos = valor;
    });
    produtos.forEach(valor => {
      valorTotal += Number(valor.valorTotalDeItens);
      totalItens += Number(valor.quantidadeTotalDeItens);
    });


    this.calculoFreteService.calcularFrete({ totalItens }).subscribe(
      value => {
        this.pedido.valorFrete = Number(value);
        this.pedido.valorTotal = Number(valorTotal) + Number(this.pedido.valorFrete);
      }
    );
    this.pedido.qntItens = totalItens;
    this.valorItens = valorTotal;
    this.valorTotal = valorTotal + this.pedido.valorFrete;
  }

  finalizarPedido() {
    console.log('Pedido finalizado, numero: ' + this.pedido.numero);
    console.log('Pedido finalizado, cliente: ' + this.pedido.cliente);
    console.log('Pedido finalizado, qntItens: ' + this.pedido.qntItens);
    console.log('Pedido finalizado, valorFrete: ' + this.pedido.valorFrete);
    console.log('Pedido finalizado, qntTotal: ' + this.pedido.valorTotal);
    if (this.pedido.cliente) {
      this.pedidoService.save(this.pedido).subscribe();
      this.router.navigate(['/consultar-pedido']);
      this.limparCarrinho();
    } else {
      this.erro = true;
    }
  }
}

