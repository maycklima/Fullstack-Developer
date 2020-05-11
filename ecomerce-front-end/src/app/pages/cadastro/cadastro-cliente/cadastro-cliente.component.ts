import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})

export class CadastroClienteComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nome', 'deletar'];

  cliente: Cliente[];
  novoCliente;
  dataSource: any;
  logo = '/assets/icones/icone-cliente.png';

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      codigo: [Math.floor(1000 + Math.random() * 9000)],
      nome: [null]
    });

    this.clienteService.list().subscribe(value => {
      const data: Cliente[] = value;
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.novoCliente = this.formulario.value;

      this.clienteService.create(this.novoCliente).subscribe(
        success => this.formulario.reset(),
        error => console.error(error),
        () => console.log('resquest completo')
      );
    }
    this.router.navigate(['/cadastroProduto']);
  }
}
