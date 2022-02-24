import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    constructor(
        private config: PrimeNGConfig,
        private translateService: TranslateService,
        private router: Router
    ) {}

    ngOnInit() {
        this.translateService.setDefaultLang('pt-br');
        this.translateService.get('primeng')
            .subscribe(res => this.config.setTranslation(res));
    }

    exibindoNavbar(){
        return this.router.url !== '/login';
    }
}
