import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CategoriasPesquisaComponent} from "./categorias-pesquisa/categorias-pesquisa.component";
import {CategoriaCadastroComponent} from "./categoria-cadastro/categoria-cadastro.component";

const routes: Routes = [
    {path: 'categorias', component: CategoriasPesquisaComponent},
    {path: 'categorias/nova', component: CategoriaCadastroComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CategoriasRoutingModule { }
