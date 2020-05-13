import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../models/pedido.model';
import { FormBuilder } from '@angular/forms';
import { PedidoService } from 'src/app/services/pedido.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consultar-pedido',
  templateUrl: './consultar-pedido.component.html',
  styleUrls: ['./consultar-pedido.component.css']
})
export class ConsultarPedidoComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'cliente.nome', 'qntItens', 'valorFrete', 'valorTotal', 'deletar'];

  pedido: Pedido[];
  dataSource: any;
  logo = '/assets/icones/icone-pedidos.png';

  constructor(private formBuilder: FormBuilder, private pedidoService: PedidoService) { }

  ngOnInit() {
    this.pedidoService.list().subscribe(value => {
      const data: Pedido[] = value;
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    });
  }
}
