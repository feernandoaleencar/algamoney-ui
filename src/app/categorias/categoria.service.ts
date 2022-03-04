import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Categoria} from "../core/model";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    categoriaUrl = 'http://localhost:8080/categorias'

    constructor(
        private http: HttpClient
    ) { }

    listarCategorias(): Promise<any> {
        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        return this.http.get(this.categoriaUrl, {headers})
            .toPromise();
    }


    excluir(id: number): Promise<void> {
        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        return this.http.delete<void>(`${this.categoriaUrl}/${id}`, {headers})
            .toPromise();
    }

    adicionar(categoria: Categoria): Promise<Categoria>{
        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

        // @ts-ignore
        return this.http.post<Categoria>(this.categoriaUrl, categoria, { headers })
            .toPromise();
    }

    atualizar(categoria: Categoria): Promise<Categoria> {
        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        // @ts-ignore
        return this.http.put<Categoria>(`${this.categoriaUrl}/${categoria.id}`, categoria, {headers})
            .toPromise();
    }

    buscarPorCodigo(id: number): Promise<Categoria> {
        const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

        return this.http.get(`${this.categoriaUrl}/${id}`, {headers})
            .toPromise()
            .then((response: any) => {
                return response
            })
    }

}
