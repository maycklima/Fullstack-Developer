import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido.model';
import { FormBuilder } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultar-pedido',
  templateUrl: './consultar-pedido.component.html',
  styleUrls: ['./consultar-pedido.component.css']
})
export class ConsultarPedidoComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'cliente.nome', 'qntItens', 'valorFrete', 'valorTotal', 'deletar'];

  pedido: Pedido[];
  dataSource: any;
  logo = 'assets/icones/icone-pedidos.png';

  constructor(private formBuilder: FormBuilder, private pedidoService: PedidoService, private snackBar: MatSnackBar) {
    this.populaLista();
  }

  ngOnInit() {
    this.populaLista();
  }

  populaLista() {
    this.pedidoService.list().subscribe(value => {
      const data: Pedido[] = value;
      this.dataSource = new MatTableDataSource(data);
    });
  }

  deletarPedido(pedido) {
    this.pedidoService.delete(pedido.numero).subscribe(
      success => this.snackBar.open('Pedido  Nº ' + pedido.numero + ' removido com sucesso', 'Fechar', { duration: 2000 }),
      erro => this.snackBar.open('Erro ao deletar o pedido Nº  ' + pedido.numero, 'Fechar', { duration: 2000 }),
      () => this.populaLista()
    );
  }
}
