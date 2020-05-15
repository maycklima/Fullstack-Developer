import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ThrowStmt } from '@angular/compiler';

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

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private router: Router, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.resetaFormulario();
  }

  resetaFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [Math.floor(1000 + Math.random() * 9000)],
      nome: [null, Validators.required]
    });

    this.clienteService.list().subscribe(value => {
      const data: Cliente[] = value;
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    });
  }

  deletarCliente(cliente) {
    this.clienteService.delete(cliente.codigo).subscribe(
      success => this.snackBar.open('Cliente ' + cliente.nome + ' removido com sucesso', 'Fechar', { duration: 2000 }),
      erro => this.snackBar.open('Erro ao deletar o cliente: ' + cliente.nome, 'Fechar', { duration: 2000 }),
      () => this.resetaFormulario()
    );
  }

  onSubmit() {
    this.novoCliente = this.formulario.value;
    if (!this.formulario.valid) {
      this.snackBar.open('Digite um nome para o cliente', 'Fechar', { duration: 2000 });
    } else {
      console.log(this.formulario.value);
      this.clienteService.create(this.novoCliente).subscribe(
        success => this.snackBar.open('Cliente adicionado com sucesso', 'Fechar', { duration: 2000 }),
        error => this.snackBar.open('Erro ao adicionar cliente', 'Fechar', { duration: 2000 }),
        () => this.resetaFormulario()
      );
    }
  }
}
