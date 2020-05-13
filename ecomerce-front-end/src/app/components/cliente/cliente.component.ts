import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, empty } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente.model';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})


export class ClienteComponent implements OnInit {

  constructor(private clienteService: ClienteService) { }

  iconCliente = '/assets/icones/icone-cliente.png';

  options: string[] = [];
  formulario = new FormControl();
  clientes$: Observable<string[]>;
  listClientes: Cliente[];
  selectedCliente: any;

  @Output() clienteSelecionado = new EventEmitter();


  ngOnInit() {
    this.onRefresh();
    this.clientes$ = this.formulario.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  onRefresh() {
    this.clienteService.list().pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        // tslint:disable-next-line: deprecation
        return empty();
      })
    ).subscribe(
      dados => {
        this.listClientes = dados;
        this.options = this.listClientes.map(x => x.nome);
        console.log(this.listClientes);
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
    this.selectedCliente = this.listClientes.find(x => x.nome === this.formulario.value);
    this.clienteSelecionado.emit({ cliente: this.selectedCliente });
    console.log(this.selectedCliente);
  }

}
