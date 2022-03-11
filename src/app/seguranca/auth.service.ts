import {Injectable} from '@angular/core';
import {Seguranca} from "../core/model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    oauthTokenUrl = 'http://localhost:8080/oauth/token';
    jwtPayload: any;

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) {
        this.carregartToken();
    }

    login(usuario: Seguranca): Promise<void> {
        const headers = this.headers()

        const body = `username=${usuario.email}&password=${usuario.senha}&grant_type=password`;

        return this.http.post<any>(this.oauthTokenUrl, body, {headers, withCredentials: true})
            .toPromise()
            .then(response => {
                this.armazenarToken(response['access_token']);
            })
            .catch(response => {
                if (response.status === 400) {
                    if (response.error.error === 'invalid_grant') {
                        return Promise.reject('Usuário ou senha inválida!')
                    }
                }

                return Promise.reject(response);
            });
    }

    private armazenarToken(token: string) {
        this.jwtPayload = this.jwtHelper.decodeToken(token);

        localStorage.setItem('token', token);
    }

    private carregartToken() {
        const token = localStorage.getItem('token');

        if (token) {
            this.armazenarToken(token);
        }
    }

    temPermissao(permissao: string) {
        return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    }

    obterNovoAccessToken(): Promise<any> {
        const headers = this.headers();

        const body = 'grant_type=refresh_token';
        return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
            .toPromise()
            .then((response:any) => {
                this.armazenarToken(response['access_token']);

                console.log('Novo access token criado!');

                return Promise.resolve();
            })
            .catch(response => {
                console.error('Erro ao renovar token', response);

                return Promise.resolve();
            });
    }

    headers() {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

        return headers;
    }

    isAccessTokenInvalido() {
        const token = localStorage.getItem('token');

        return !token || this.jwtHelper.isTokenExpired(token);
    }

    temQualquerPermissao(roles: any){
        for (const role of roles) {
            if (this.temPermissao(role)){
                return true;
            }
        }

        return false;
    }

    limparAccessToken() {
        localStorage.removeItem('token');
        this.jwtPayload = null;
    }
}
