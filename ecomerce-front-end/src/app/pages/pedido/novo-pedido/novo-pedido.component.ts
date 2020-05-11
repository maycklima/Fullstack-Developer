import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.css']
})
export class NovoPedidoComponent implements OnInit {

  constructor() { }



  iconCliente = '/assets/icones/icone-cliente.png';
  iconCarrinho = '/assets/icones/icone-carrinho.png';
  iconTotal = '/assets/icones/icone-total.png';

  ngOnInit(): void {
  }

}
