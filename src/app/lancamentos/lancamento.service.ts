import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Lancamento} from "../core/model";
import {environment} from "../../environments/environment";

export class LancamentoFiltro {
    descricao?: string;
    dataVencimentoInicio?: Date;
    dataVencimentoFim?: Date;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable({
    providedIn: 'root'
})
export class LancamentoService {

    lancamentosUrl: string;

    constructor(
        private http: HttpClient,
        private datePipe: DatePipe
    ) {
        this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
    }

    pesquisar(filtro: LancamentoFiltro): Promise<any> {

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
            { params})
            .toPromise()
            .then((response: any) => {
                const lancamentos = response['content'];

                const resultado = {
                    lancamentos,
                    total: response['totalElements']
                };

                return resultado;
            });

    }

    excluir(id: number): Promise<void> {

        return this.http.delete<void>(`${this.lancamentosUrl}/${id}`)
            .toPromise()
    }

    Adicionar(lancamento: Lancamento): Promise<Lancamento> {

        // @ts-ignore
        return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
            .toPromise()

    }

    atualizar(lancamento: Lancamento): Promise<Lancamento> {

        // @ts-ignore
        return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.id}`, lancamento)
            .toPromise();
    }

    buscarPorCodigo(id: number): Promise<Lancamento> {

        return this.http.get(`${this.lancamentosUrl}/${id}`,)
            .toPromise()
            .then((response: any) => {
                this.converterStringsParaDatas([response]);

                return response;
            });
    }

    private converterStringsParaDatas(lancamentos: any[]) {

        for (const lancamento of lancamentos) {

            lancamento.dataVencimento = new Date(lancamento.dataVencimento + 'T00:00');

            if (lancamento.dataPagamento) {
                lancamento.dataPagamento = new Date(lancamento.dataPagamento + 'T00:00');
            }
        }
    }
}
