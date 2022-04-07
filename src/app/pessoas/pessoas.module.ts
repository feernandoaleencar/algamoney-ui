import {NgModule} from '@angular/core';

import {PessoaCadastroComponent} from "./pessoa-cadastro/pessoa-cadastro.component";
import {PessoasPesquisaComponent} from "./pessoas-pesquisa/pessoas-pesquisa.component";
import {SharedModule} from "../shared/shared.module";
import {PessoasRoutingModuleModule} from "./pessoas-routing.module";
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';

@NgModule({
    declarations: [
        PessoaCadastroComponent,
        PessoasPesquisaComponent,
        PessoaCadastroContatoComponent,
    ],
    imports: [
        SharedModule,
        PessoasRoutingModuleModule
    ],
    exports: []
})
export class PessoasModule {
}
