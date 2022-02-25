import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import {HttpClient} from "@angular/common/http";
import localePt from "@angular/common/locales/pt";

import {NavbarComponent} from "./navbar/navbar.component";
import {ErrorHandlerService} from "./error-handler.service";

import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {LancamentoService} from "../lancamentos/lancamento.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {RouterModule} from "@angular/router";
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import {Title} from "@angular/platform-browser";
import {PessoaService} from "../pessoas/pessoa.service";
import {AuthService} from "../seguranca/auth.service";

registerLocaleData(localePt, 'pt-BR')

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        NavbarComponent,
        PaginaNaoEncontradaComponent],
    imports: [
        CommonModule,
        RouterModule,

        ToastModule,
        ConfirmDialogModule,

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    exports: [
        NavbarComponent,

        ToastModule,
        ConfirmDialogModule,

    ],
    providers: [
        DatePipe,

        ErrorHandlerService,
        LancamentoService,
        PessoaService,
        AuthService,

        MessageService,
        ConfirmationService,
        TranslateService,
        Title,
        {provide: LOCALE_ID, useValue: 'pt-BR' }
    ]
})
export class CoreModule {
}
