import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CategoriasPesquisaComponent} from "./categorias-pesquisa/categorias-pesquisa.component";
import {CategoriaCadastroComponent} from "./categoria-cadastro/categoria-cadastro.component";
import {AuthGuard} from "../seguranca/auth.guard";

const routes: Routes = [
    {
        path: '',
        component: CategoriasPesquisaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_CATEGORIA']}
    },
    {
        path: 'nova',
        component: CategoriaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_CATEGORIA']}
    },
    {
        path: ':id',
        component: CategoriaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_CATEGORIA']}
    },
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
