import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Estado, Municipio, Pessoa} from "../core/model";
import {environment} from "../../environments/environment";

export class PessoaFiltro {
    nome?: string;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    pessoaUrl: string;
    municipioUrl: string;
    estadoUrl: string;

    constructor(
        private http: HttpClient,
    ) {
        this.pessoaUrl = `${environment.apiUrl}/pessoas`;
        this.municipioUrl = `${environment.apiUrl}/municipios`;
        this.estadoUrl = `${environment.apiUrl}/estados`;
    }

    pesquisar(filtro: PessoaFiltro): Promise<any> {

        let params = new HttpParams();
        params = params.set('page', filtro.pagina);
        params = params.set('size', filtro.itensPorPagina);

        if (filtro.nome) {
            params = params.set('nome', filtro.nome);
        }

        return this.http.get(`${this.pessoaUrl}`, {params})
            .toPromise()
            .then((response: any) => {
                const pessoas = response['content'];

                const resultado = {
                    pessoas,
                    total: response['totalElements']
                };

                return resultado;
            });

    }

    listarPessoas(): Promise<any> {

        return this.http.get(this.pessoaUrl)
            .toPromise()
            .then((response: any) => response['content'])
    }

    excluir(id: number): Promise<void> {

        return this.http.delete<void>(`${this.pessoaUrl}/${id}`)
            .toPromise();
    }

    mudarStatus(id: number, ativo: boolean): Promise<any> {

        return this.http.put<void>(`${this.pessoaUrl}/${id}/ativo`, ativo)
            .toPromise();

    }

    adicionar(pessoa: Pessoa): Promise<Pessoa>{

        // @ts-ignore
        return this.http.post<Pessoa>(this.pessoaUrl, pessoa)
            .toPromise();
    }

    atualizar(pessoa: Pessoa): Promise<Pessoa> {

        // @ts-ignore
        return this.http.put<Pessoa>(`${this.pessoaUrl}/${pessoa.id}`, pessoa)
            .toPromise();
    }

    buscarPorCodigo(id: number): Promise<Pessoa> {

        return this.http.get(`${this.pessoaUrl}/${id}`)
            .toPromise()
            .then((response: any) => {
                return response
            })
    }

    listarEstados(): Promise<Estado[]> {

        // @ts-ignore
        return this.http.get(this.estadoUrl)
            .toPromise();
    }

    pesquisarMunicipios(estadoId: number): Promise<Municipio[]> {

        // @ts-ignore
        return this.http.get(`${this.municipioUrl}?estado=${estadoId}`)
            .toPromise();
    }
}
