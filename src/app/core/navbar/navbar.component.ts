import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../seguranca/auth.service";

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
    ) { }

    ngOnInit(): void {
        this.usuarioLogado = this.authService.jwtPayload?.nome;
    }

    temPermissao(permissao: string) {
        return this.authService.temPermissao(permissao);
    }

    ObterNovoAccessToken(){
        this.authService.obterNovoAccessToken();
    }

}
