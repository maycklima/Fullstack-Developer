import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  logo = '/assets/icones/logotipo-maximatech.png'


  constructor() { }

  ngOnInit(): void {
  }

}
