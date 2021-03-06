import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Categoria} from "../core/model";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    categoriaUrl: string;

    constructor(
        private http: HttpClient
    ) {
        this.categoriaUrl = `${environment.apiUrl}/categorias`;
    }

    listarCategorias(): Promise<any> {

        return this.http.get(this.categoriaUrl)
            .toPromise();
    }


    excluir(id: number): Promise<void> {

        return this.http.delete<void>(`${this.categoriaUrl}/${id}`)
            .toPromise();
    }

    adicionar(categoria: Categoria): Promise<Categoria>{

        // @ts-ignore
        return this.http.post<Categoria>(this.categoriaUrl, categoria)
            .toPromise();
    }

    atualizar(categoria: Categoria): Promise<Categoria> {

        // @ts-ignore
        return this.http.put<Categoria>(`${this.categoriaUrl}/${categoria.id}`, categoria)
            .toPromise();
    }

    buscarPorCodigo(id: number): Promise<Categoria> {

        return this.http.get(`${this.categoriaUrl}/${id}`)
            .toPromise()
            .then((response: any) => {
                return response
            })
    }

}
