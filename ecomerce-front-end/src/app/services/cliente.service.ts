import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.model';
import { environment } from './../../environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = `${environment.API}clientes`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Cliente[]>(this.API);
  }

  create(cliente) {
    return this.http.post(this.API, cliente).pipe(take(1));
  }

  delete(codigo) {
    return this.http.delete(`${this.API}/${codigo}`).pipe(take(1));
  }
}
