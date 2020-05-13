import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, empty } from 'rxjs';
import { Produto } from 'src/app/models/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { startWith, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }


  options: string[] = [];
  formulario = new FormControl();
  produto$: Observable<string[]>;
  listProdutos: Produto[];
  selectedProduto: any;

  @Output() produtoSelecionado = new EventEmitter();

  ngOnInit() {
    this.onRefresh();
    this.produto$ = this.formulario.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  onRefresh() {
    this.produtoService.list().pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        // tslint:disable-next-line: deprecation
        return empty();
      })
    ).subscribe(
      dados => {
        this.listProdutos = dados;
        this.options = this.listProdutos.map(x => x.nome);
        console.log(this.listProdutos);
      }, error => console.error(error),
      () => console.log('Obserservable completo!')
    );
  }
  handleError() {
    throw new Error('Method not implemented.');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFn(subject) {
    return subject ? subject : undefined;
  }

  onSubmit() {
    this.selectedProduto = this.listProdutos.find(x => x.nome === this.formulario.value);
    this.produtoSelecionado.emit({ produto: this.selectedProduto });
    console.log(this.selectedProduto);
  }
}

