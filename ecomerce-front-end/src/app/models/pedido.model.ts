import { Cliente } from './cliente.model';

export class Pedido {
  numero: number;
  qntItens: number;
  valorFrete: number;
  valorTotal: number;
  cliente: Cliente;
}
