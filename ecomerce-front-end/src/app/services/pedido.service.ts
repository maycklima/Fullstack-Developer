import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';
import { Pedido } from '../models/pedido.model';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    private readonly API = `${environment.API}pedidos`;

    constructor(private http: HttpClient) { }

    list() {
        return this.http.get<Pedido[]>(this.API);
    }

    save(pedido) {
        console.log('Dentro do save');
        console.log(pedido);
        return this.http.post(this.API, pedido).pipe(take(1));
    }

    delete(pedido) {
        return this.http.delete(`${this.API}/${pedido}`).pipe(take(1));
    }
}