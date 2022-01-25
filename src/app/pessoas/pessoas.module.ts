import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PessoaCadastroComponent} from "./pessoa-cadastro/pessoa-cadastro.component";
import {PessoasPesquisaComponent} from "./pessoas-pesquisa/pessoas-pesquisa.component";
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
import {FormsModule} from "@angular/forms";
import {MessageModule} from "primeng/message";


@NgModule({
    declarations: [
        PessoaCadastroComponent,
        PessoasPesquisaComponent
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
    ],
    exports: [
        PessoaCadastroComponent,
        PessoasPesquisaComponent
    ]
})
export class PessoasModule {
}
