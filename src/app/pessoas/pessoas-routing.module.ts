import {NgModule} from "@angular/core";

import {RouterModule, Routes} from "@angular/router";
import {PessoasPesquisaComponent} from "./pessoas-pesquisa/pessoas-pesquisa.component";

const routes: Routes = [
    {path: 'pessoas', component: PessoasPesquisaComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PessoasRoutingModuleModule { }
