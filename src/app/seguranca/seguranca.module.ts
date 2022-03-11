import {NgModule} from '@angular/core';
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";

import {SharedModule} from "../shared/shared.module";
import {SegurancaRoutingModule} from "./seguranca-routing.module";
import {LoginFormComponent} from './login-form/login-form.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MoneyHttpInterceptor} from "./money-http-interceptor";
import {environment} from "../../environments/environment";

export function tokenGetter(): string {
    return localStorage.getItem('token')!;
}

@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
        SharedModule,
        SegurancaRoutingModule,

        JwtModule.forRoot({
            config: {
                tokenGetter,
                allowedDomains: environment.tokenAllowedDomains,
                disallowedRoutes: environment.tokenDisallowedRoutes
            }
        }),

    ],
    exports: [],
    providers: [
        JwtHelperService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MoneyHttpInterceptor,
            multi: true
        }]
})
export class SegurancaModule {
}
