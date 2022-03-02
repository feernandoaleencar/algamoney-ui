import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {CategoriasPesquisaComponent} from "./categorias-pesquisa/categorias-pesquisa.component";
import {CategoriasRoutingModule} from "./categorias-routing.module";
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';

@NgModule({
    declarations: [
        CategoriasPesquisaComponent,
        CategoriaCadastroComponent
    ],
    imports: [
        SharedModule,
        CategoriasRoutingModule
    ],
    exports: []
})
export class CategoriasModule {
}
