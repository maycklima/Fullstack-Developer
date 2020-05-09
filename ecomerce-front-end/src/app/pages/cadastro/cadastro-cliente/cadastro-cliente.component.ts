import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface PeriodicElement {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen' },
  { name: 'Helium' },
  { name: 'Lithium' },
  { name: 'Beryllium' },
  { name: 'Boron' },
  { name: 'Carbon' },
  { name: 'Nitrogen' },
  { name: 'Oxygen' },
  { name: 'Fluorine' },
  { name: 'Neon' },
];

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})

export class CadastroClienteComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      nome: [null]

    });

  }

  onSubmit() {
    console.log(this.formulario);
  }
}
