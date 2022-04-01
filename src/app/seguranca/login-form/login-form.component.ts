import {Component, OnInit} from '@angular/core';
import {Seguranca} from "../../core/model";
import {AuthService} from "../auth.service";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    seguranca = new Seguranca();

    constructor(
        private authService: AuthService,
        private errorHandlerService: ErrorHandlerService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    login(usuario: Seguranca) {
        this.authService.login(usuario)
            .then(() => {
                this.router.navigate(['/dashboard']);
            })
            .catch(erro =>{
                this.errorHandlerService.handle(erro);
            });
    }

}
