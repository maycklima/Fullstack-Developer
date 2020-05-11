import { Cliente } from './cliente.model';

export interface Pedido {
  numero: string;
  qtdItens: string;
  valorFrete: string;
  valorTotal: string;
  cliente: Cliente;
}
