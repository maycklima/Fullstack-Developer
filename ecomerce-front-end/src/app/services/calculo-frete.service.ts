import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculoFreteService {



  private readonly API = `${environment.FRETE_API}frete`;

  constructor(public httpClient: HttpClient) {
  }

  calcularFrete(totalItens) {
    return this.httpClient.post(this.API, totalItens);
  }
}
