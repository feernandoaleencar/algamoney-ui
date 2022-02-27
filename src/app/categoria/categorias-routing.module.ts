import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CategoriasPesquisaComponent} from "./categorias-pesquisa/categorias-pesquisa.component";

const routes: Routes = [
    {path: 'categorias', component: CategoriasPesquisaComponent},
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
