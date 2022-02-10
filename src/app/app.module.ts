import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {CoreModule} from "./core/core.module";

import {AppComponent} from './app.component';
import {LancamentosModule} from "./lancamentos/lancamentos.module";
import {PessoasModule} from "./pessoas/pessoas.module";
import {LancamentosPesquisaComponent} from "./lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component";
import {LancamentoCadastroComponent} from "./lancamentos/lancamento-cadastro/lancamento-cadastro.component";
import {PessoasPesquisaComponent} from "./pessoas/pessoas-pesquisa/pessoas-pesquisa.component";

const routes: Routes = [
    {path: 'lancamentos', component: LancamentosPesquisaComponent},
    {path: 'lancamentos/novo', component: LancamentoCadastroComponent},
    {path: 'pessoas', component: PessoasPesquisaComponent},
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        LancamentosModule,
        PessoasModule,

        CoreModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
