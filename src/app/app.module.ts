import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {CoreModule} from "./core/core.module";

import {AppComponent} from './app.component';
import {LancamentosModule} from "./lancamentos/lancamentos.module";
import {PessoasModule} from "./pessoas/pessoas.module";
import {AppRoutingModule} from "./app-routing.module";
import {SegurancaModule} from "./seguranca/seguranca.module";
import {CategoriasModule} from "./categoria/categorias.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        LancamentosModule,
        PessoasModule,
        CategoriasModule,
        SegurancaModule,

        CoreModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
