import {Injectable} from '@angular/core';
import { DatePipe } from '@angular/common';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

export class LancamentoFiltro {
    descricao?: string;
    dataVencimentoInicio?: Date;
    dataVencimentoFim?: Date;
    pagina = 0;
    itensPorPagina = 3;
}

@Injectable({
    providedIn: 'root'
})
export class LancamentoService {

    lancamentosUrl = 'http://localhost:8080/lancamentos'

    constructor(
        private http: HttpClient,
        private datePipe: DatePipe
    ) {
    }

    pesquisar(filtro: LancamentoFiltro): Promise<any> {

        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        let params = new HttpParams();

        params = params.set('page', filtro.pagina);
        params = params.set('size', filtro.itensPorPagina);

        if (filtro.descricao) {
           params = params.set('descricao', filtro.descricao);
        }

        if (filtro.dataVencimentoInicio) {
            params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'dd-MM-yyyy')!);
        }

        if (filtro.dataVencimentoFim) {
            params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'dd-MM-yyyy')!);
        }

        return this.http.get(`${this.lancamentosUrl}?resumo`,
            { headers, params})
            .toPromise()
            .then((response : any) => {
                const lancamentos = response['content'];

                const resultado = {
                    lancamentos,
                    total: response['totalElements']
                };

                return resultado;
            });

    }

    excluir(id: number): Promise<void> {
        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        return this.http.delete<void>(`${this.lancamentosUrl}/${id}`, { headers })
            .toPromise()
    }

}
