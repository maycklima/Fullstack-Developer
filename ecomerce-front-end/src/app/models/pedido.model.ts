import { Cliente } from './cliente.model';

export class Pedido {
  numero: number;
  qtdItens: number;
  valorFrete: number;
  valorTotal: number;
  cliente: Cliente;
}
