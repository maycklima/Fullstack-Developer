import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';
import { MatTableDataSource } from '@angular/material/table';
import { CarrinhoValores } from 'src/app/models/carrinho-valores.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nome', 'precoUnitario', 'deletar'];

  produto: Produto[];
  novoProduto: Produto;
  dataSource: any;
  produtos: CarrinhoValores[] = [];

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private clienteService: ProdutoService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetaFormulario();
  }

  resetaFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [Math.floor(1000 + Math.random() * 9000)],
      nome: [null, Validators.required],
      precoUnitario: [null, Validators.required]
    });

    this.clienteService.list().subscribe(value => {
      const data: Produto[] = value;
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    });
  }

  deletarProduto(produto) {
    this.clienteService.delete(produto.codigo).subscribe(
      success => this.snackBar.open('Produto ' + produto.nome + ' removido com sucesso', 'Fechar', { duration: 2000 }),
      erro => this.snackBar.open('Erro ao deletar o produto: ' + produto.nome, 'Fechar', { duration: 2000 }),
      () => this.resetaFormulario()
    );
  }

  onSubmit() {
    if (!this.formulario.valid) {
      this.snackBar.open('Preencha todos os campos', 'Fechar', { duration: 2000 });
    } else {
      console.log(this.formulario.value);
      this.novoProduto = this.formulario.value;
      this.clienteService.create(this.novoProduto).subscribe(
        success => this.snackBar.open('Produto adicionado com sucesso', 'Fechar', { duration: 2000 }),
        error => this.snackBar.open('Erro ao adicionar produto', 'Fechar', { duration: 2000 }),
        () => this.resetaFormulario()
      );
    }
  }
}
