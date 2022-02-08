import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

export class PessoaFiltro {
    nome?: string;
    pagina = 0;
    itensPorPagina = 3;
}

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    pessoaUrl = 'http://localhost:8080/pessoas'

    constructor(
        private http: HttpClient,
    ) { }

    pesquisar(filtro: PessoaFiltro): Promise<any>{

        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        let params = new HttpParams();
        params = params.set('page', filtro.pagina);
        params = params.set('size', filtro.itensPorPagina);

        if (filtro.nome) {
            params = params.set('nome', filtro.nome);
        }

        return this.http.get(`${this.pessoaUrl}`, { headers, params })
            .toPromise()
            .then((response : any) => {
                const pessoas = response['content'];

                const resultado = {
                    pessoas,
                    total: response['totalElements']
                };

                return resultado;
            });

    }

    listarTodos(): Promise<any>  {
        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        return this.http.get(this.pessoaUrl, { headers })
            .toPromise()
            .then((response : any) => response['content'])
    }
}
