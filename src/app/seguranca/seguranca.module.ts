import {NgModule} from '@angular/core';

import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";

import {SharedModule} from "../shared/shared.module";
import {SegurancaRoutingModule} from "./seguranca-routing.module";
import {LoginFormComponent} from './login-form/login-form.component';

@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
        SharedModule,
        SegurancaRoutingModule,

        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return '';
                }
            }
        }),

    ],
    exports: [],
    providers: [JwtHelperService]
})
export class SegurancaModule {
}
