import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

    tokensRevokeUrl: string;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    }

    logout() {
        return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
            .toPromise()
            .then(() => {
                this.authService.limparAccessToken();
            });
    }
}
