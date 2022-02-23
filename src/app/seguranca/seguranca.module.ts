import {NgModule} from '@angular/core';
import {LoginFormComponent} from './login-form/login-form.component';
import {SegurancaRoutingModule} from "./seguranca-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    LoginFormComponent
  ],
    imports: [
        SharedModule,
        SegurancaRoutingModule,

    ],
  exports: []

})
export class SegurancaModule { }
