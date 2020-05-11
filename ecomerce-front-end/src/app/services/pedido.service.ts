import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';
import { Produto } from '../models/produto.model';
import { Pedido } from '../models/pedido';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    private readonly API = `${environment.API}pedidos`;

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<Pedido[]>(this.API);
    }

    create(pedido) {
        return this.http.post(this.API, pedido).pipe(take(1));
    }
}