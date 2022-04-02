import {NgModule} from '@angular/core';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from './dashboard/dashboard.component';
import {DecimalPipe} from "@angular/common";


@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        SharedModule,
        DashboardRoutingModule
    ],
    providers: [
        DecimalPipe
    ]
})
export class DashboardModule {
}
