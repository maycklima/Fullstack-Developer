import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastroClienteComponent } from './pages/cadastro/cadastro-cliente/cadastro-cliente.component';
import { CadastroProdutoComponent } from './pages/cadastro/cadastro-produto/cadastro-produto.component';
import { NovoPedidoComponent } from './pages/pedido/novo-pedido/novo-pedido.component';
import { ConsultarPedidoComponent } from './pages/pedido/consultar-pedido/consultar-pedido.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { CalculoValoresComponent } from './components/calculo-valores/calculo-valores.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CadastroClienteComponent,
    CadastroProdutoComponent,
    NovoPedidoComponent,
    ConsultarPedidoComponent,
    ClienteComponent,
    CarrinhoComponent,
    ProdutoComponent,
    CalculoValoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
