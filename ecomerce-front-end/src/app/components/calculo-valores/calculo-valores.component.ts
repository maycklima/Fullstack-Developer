
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarrinhoProduto } from '../../models/produtos-carrinho.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-calculo-valores',
    templateUrl: './calculo-valores.component.html',
    styleUrls: ['./calculo-valores.component.css']
})


export class CalculoValoresComponent implements OnInit {

    @Input() prod: CarrinhoProduto;
    form: FormGroup;
    @Output() valorCalculado = new EventEmitter();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            precoUnitario: [this.prod.precoUnitario],
            quantidade: [this.prod.quantidade],
            valorTotal: [this.prod.valorTotal]
        }
        );
        this.valorCalculado.emit(this.prod);
    }

    onCalcularPrecoTotal(produto: CarrinhoProduto, event) {
        this.prod.valorTotal = produto.precoUnitario * event.target.value;
        this.prod.valorTotal = produto.valorTotal;
        this.prod.quantidade = event.target.value;
        if (this.prod.valorTotal > 0 && this.prod.precoUnitario !== this.prod.valorTotal) {
            this.valorCalculado.emit(this.prod);
        }
    }

}
