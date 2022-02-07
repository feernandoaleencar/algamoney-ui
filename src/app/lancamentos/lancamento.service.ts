import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

export interface lancamentoFiltro {
    descricao: string;
}

@Injectable({
    providedIn: 'root'
})
export class LancamentoService {

    lancamentosUrl = 'http://localhost:8080/lancamentos'

    constructor(
        private http: HttpClient
    ) {
    }

    pesquisar(filtro: lancamentoFiltro): Promise<any> {

        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        let params = new HttpParams();

        if (filtro.descricao) {
           params = params.set('descricao', filtro.descricao);
        }

        return this.http.get(`${this.lancamentosUrl}?resumo`,
            { headers, params})
            .toPromise()
            .then((response : any) => response['content']);

    }
}
