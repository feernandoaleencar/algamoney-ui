import {RouterModule, Routes} from "@angular/router";
import {PaginaNaoEncontradaComponent} from "./core/pagina-nao-encontrada.component";
import {NgModule} from "@angular/core";
import {NaoAutorizadoComponent} from "./core/nao-autorizado.component";

const routes: Routes = [

    { path: 'lancamentos', loadChildren: () => import('../app/lancamentos/lancamentos.module').then(m => m.LancamentosModule) },
    { path: 'pessoas', loadChildren: () => import('../app/pessoas/pessoas.module').then(m => m.PessoasModule) },
    { path: 'categorias', loadChildren: () => import('../app/categorias/categorias.module').then(m => m.CategoriasModule) },
    { path: 'dashboard', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule) },

    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'nao-autorizado', component: NaoAutorizadoComponent},

    //Não adicionar novos path abaixo
    {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
    {path: '**', redirectTo: 'pagina-nao-encontrada'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule { }
