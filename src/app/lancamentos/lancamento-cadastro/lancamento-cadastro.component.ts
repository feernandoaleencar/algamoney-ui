import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../../categoria/categoria.service";
import {ErrorHandlerService} from "../../core/error-handler.service";

@Component({
    selector: 'app-lancamento-cadastro',
    templateUrl: './lancamento-cadastro.component.html',
    styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

    tipos = [
        {label: 'Receita', value: 'RECEITA'},
        {label: 'Despesa', value: 'DESPESA'},
    ];

    categorias: any = [];

    pessoas = [
        {label: 'João da Silva', value: 1},
        {label: 'Sebastião Souza', value: 2},
        {label: 'Maria Abadia', value: 3},
    ];


    constructor(
        private categoriaService: CategoriaService,
        private errorHandlerService: ErrorHandlerService
    ) {
    }

    ngOnInit(): void {
        this.carregarCategorias();
    }

    carregarCategorias() {
        return this.categoriaService.listarCategorias()
            .then(categorias => {
                this.categorias = categorias.map((c: any) => ({ label: c.nome, value: c.id }))
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

}
