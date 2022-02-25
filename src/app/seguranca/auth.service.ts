import {Injectable} from '@angular/core';
import {Seguranca} from "../core/model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    oauthTokenUrl = 'http://localhost:8080/oauth/token';

    constructor(
        private http: HttpClient,
    ) { }

    login(usuario: Seguranca): Promise<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

        const body = `username=${usuario.email}&password=${usuario.senha}&grant_type=password`;

        return this.http.post(this.oauthTokenUrl, body, { headers })
            .toPromise()
            .then(response => {
                console.log(response)
            })
            .catch(response => {
                console.log(response)
            });
    }
}
