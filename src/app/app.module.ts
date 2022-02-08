import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {LancamentosModule} from "./lancamentos/lancamentos.module";
import {PessoasModule} from "./pessoas/pessoas.module";
import {CoreModule} from "./core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {LancamentoService} from "./lancamentos/lancamento.service";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
        ToastModule,
        ConfirmDialogModule
    ],
    providers: [
        LancamentoService,
        MessageService,
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
