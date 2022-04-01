import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MessageComponent} from "./message/message.component";
import {MessageModule} from "primeng/message";
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PanelModule} from "primeng/panel";
import {ChartModule} from "primeng/chart";

@NgModule({
    declarations: [
        MessageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MessageModule,

        //componentes primeng
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
        PanelModule,
        ChartModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MessageComponent,

        //componentes primeng
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
        PanelModule,
        ChartModule
    ]
})
export class SharedModule {
}
