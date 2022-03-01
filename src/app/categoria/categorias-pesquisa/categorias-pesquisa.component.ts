import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../categoria.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-categorias-pesquisa',
    templateUrl: './categorias-pesquisa.component.html',
    styleUrls: ['./categorias-pesquisa.component.css']
})
export class CategoriasPesquisaComponent implements OnInit {

    categorias = []

    constructor(
        private categoriaService: CategoriaService,
        private title: Title
    ) {
    }

    ngOnInit(): void {
        this.title.setTitle('Pesquisa de Categorias');
        this.listarCategorias();
    }

    listarCategorias(){
        this.categoriaService.listarCategorias()
            .then(resultado => {
                this.categorias = resultado;
            })
    }

}
