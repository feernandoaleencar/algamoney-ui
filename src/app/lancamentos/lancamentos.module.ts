import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {LancamentoCadastroComponent} from "./lancamento-cadastro/lancamento-cadastro.component";
import {LancamentosPesquisaComponent} from "./lancamentos-pesquisa/lancamentos-pesquisa.component";

import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {SelectButtonModule} from "primeng/selectbutton";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";
import {MessageModule} from "primeng/message";

@NgModule({
    declarations: [
        LancamentoCadastroComponent,
        LancamentosPesquisaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

        InputTextModule,
        ButtonModule,
        TableModule,
        TooltipModule,
        InputTextareaModule,
        CalendarModule,
        SelectButtonModule,
        DropdownModule,
        InputNumberModule,
        InputMaskModule,
        MessageModule
    ],
    exports: [
        LancamentoCadastroComponent,
        LancamentosPesquisaComponent
    ]
})
export class LancamentosModule {
}
