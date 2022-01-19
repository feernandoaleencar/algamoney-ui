import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        InputTextModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
