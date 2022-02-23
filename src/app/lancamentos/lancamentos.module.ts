import {NgModule} from '@angular/core';

import {LancamentoCadastroComponent} from "./lancamento-cadastro/lancamento-cadastro.component";
import {LancamentosPesquisaComponent} from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import {SharedModule} from "../shared/shared.module";
import {LancamentosRoutingModule} from "./lancamentos-routing.module";

@NgModule({
    declarations: [
        LancamentoCadastroComponent,
        LancamentosPesquisaComponent,
    ],
    imports: [
        SharedModule,
        LancamentosRoutingModule
    ],
    exports: []
})
export class LancamentosModule {
}
