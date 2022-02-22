import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from "./seguranca-routing.module";



@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,

    SegurancaRoutingModule
  ],
  exports: []

})
export class SegurancaModule { }
