import { Component, OnInit, OnChanges, AfterContentInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CarrinhoValores } from 'src/app/models/carrinho-valores.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido.model';
import { CalculoFreteService } from 'src/app/services/calculo-frete.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarrinhoComponent } from 'src/app/components/carrinho/carrinho.component';

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
    private changeDetector: ChangeDetectorRef,
    // tslint:disable-next-line: align
    private snackBar: MatSnackBar) { }

  iconCliente = '/assets/icones/icone-cliente.png';
  iconCarrinho = '/assets/icones/icone-carrinho.png';
  iconTotal = '/assets/icones/icone-total.png';
  impressaoCliente: any;

  valorTotal: any;
  valorItens: number;
  pedido = new Pedido();
  freteRecebido: number;
  qntProdutos: number;
  verificaFrete = true;

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
    this.produtos = [];
    this.pedido.qntItens = null;
    this.valorItens = 0;
    this.pedido.valorFrete = 0;
    this.pedido.valorTotal = 0;
    this.calcularPrecoTotal(this.produtos);
    this.carrinhoService.limparCarrinho();
  }

  // calcula o preço total do carrinho
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

    // metodo para verificar se já foi recebido um valor para o frete
    if (this.verificaFrete) {
      this.calculoFreteService.calcularFrete({ totalItens }).subscribe(
        value => {
          this.freteRecebido = Number(value);
          this.pedido.valorFrete = Number(value);
          this.pedido.valorTotal = Number(valorTotal) + Number(this.pedido.valorFrete);
        });
      this.verificaFrete = false;
    } else {
      this.pedido.valorFrete = totalItens * this.freteRecebido;
      this.pedido.valorTotal = valorTotal + this.pedido.valorFrete;
    }

    this.verificaFrete = false;
    this.pedido.qntItens = totalItens;
    this.valorItens = valorTotal;
    this.valorTotal = valorTotal + this.pedido.valorFrete;
  }

  // metodo para finalizar o pedido
  finalizarPedido() {
    if (!this.pedido.cliente) {
      this.snackBar.open('Selecione um cliente para fazer o pedido', 'Fechar', { duration: 2000 });
      // tslint:disable-next-line: triple-equals
    } else if (this.pedido.qntItens == null || this.pedido.qntItens == 0) {
      this.snackBar.open('Selecione algum produto para colocar no carrinho', 'Fechar', { duration: 2000 });
    } else {
      console.log('Pedido finalizado, numero: ' + this.pedido.numero);
      console.log('Pedido finalizado, cliente: ' + this.pedido.cliente);
      console.log('Pedido finalizado, qntItens: ' + this.pedido.qntItens);
      console.log('Pedido finalizado, valorFrete: ' + this.pedido.valorFrete);
      console.log('Pedido finalizado, qntTotal: ' + this.pedido.valorTotal);
      this.snackBar.open('Pedido realizado com sucesso', 'Fechar', { duration: 2000 });
      this.pedidoService.save(this.pedido).subscribe();
      this.limparCarrinho();
      this.router.navigate(['/consultar-pedido']);
    }
  }
}