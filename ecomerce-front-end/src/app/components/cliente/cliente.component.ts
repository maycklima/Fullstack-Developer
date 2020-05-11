import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})


export class ClienteComponent implements OnInit {

  constructor() { }

  iconCliente = '/assets/icones/icone-cliente.png';

  ngOnInit(): void {
  }

}
