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

registerLocaleData(localePt, 'pt-BR')

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        NavbarComponent],
    imports: [
        CommonModule,

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

        MessageService,
        ConfirmationService,
        TranslateService,
        {provide: LOCALE_ID, useValue: 'pt-BR' }
    ]
})
export class CoreModule {
}
