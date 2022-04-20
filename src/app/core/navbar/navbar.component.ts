import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../seguranca/auth.service";
import {LogoutService} from "../../seguranca/logout.service";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../error-handler.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    exibindoMenu: boolean = false;
    usuarioLogado: string = '';

    constructor(
        private authService: AuthService,
        private logoutService: LogoutService,
        private errorHandler: ErrorHandlerService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.usuarioLogado = this.authService.jwtPayload?.nome;
    }

    temPermissao(permissao: string) {
        return this.authService.temPermissao(permissao);
    }

    logout() {
        this.logoutService.logout()
            .then(() => {
                this.router.navigate(['/login']);
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

    exibirMenu(){
        this.exibindoMenu = !this.exibindoMenu
    }
}
