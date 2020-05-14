import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';
import { MatTableDataSource } from '@angular/material/table';
import { CarrinhoValores } from 'src/app/models/carrinho-valores.model';


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

  constructor(private formBuilder: FormBuilder, private clienteService: ProdutoService) { }

  ngOnInit() {
    this.resetaFormulario();
  }

  resetaFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [Math.floor(1000 + Math.random() * 9000)],
      nome: [null],
      precoUnitario: [null]
    });

    this.clienteService.list().subscribe(value => {
      const data: Produto[] = value;
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.novoProduto = this.formulario.value;
      this.clienteService.create(this.novoProduto).subscribe(
        success => this.resetaFormulario(),
        error => console.error(error),
        () => console.log('resquest completo')
      );
    }
  }
}
