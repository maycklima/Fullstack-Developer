import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = `${environment.API}produtos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Produto[]>(this.API);
  }

  create(produto) {
    return this.http.post(this.API, produto).pipe(take(1));
  }

  delete(produto) {
    return this.http.delete(`${this.API}/${produto}`).pipe(take(1));
  }
}
