import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-categorias-pesquisa',
    templateUrl: './categorias-pesquisa.component.html',
    styleUrls: ['./categorias-pesquisa.component.css']
})
export class CategoriasPesquisaComponent implements OnInit {

    categorias = [
        {
            "id": 1,
            "nome": "Lazer"
        },
        {
            "id": 2,
            "nome": "Alimentação"
        },
        {
            "id": 3,
            "nome": "Supermercado"
        },
        {
            "id": 4,
            "nome": "Farmácia"
        },
        {
            "id": 5,
            "nome": "Outros"
        }
    ]

    constructor() {
    }

    ngOnInit(): void {
    }

}
