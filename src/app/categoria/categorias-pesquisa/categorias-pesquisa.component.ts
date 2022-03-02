import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoriaService} from "../categoria.service";
import {Title} from "@angular/platform-browser";
import {ConfirmationService, MessageService} from "primeng/api";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {Table} from "primeng/table";

@Component({
    selector: 'app-categorias-pesquisa',
    templateUrl: './categorias-pesquisa.component.html',
    styleUrls: ['./categorias-pesquisa.component.css']
})
export class CategoriasPesquisaComponent implements OnInit {

    categorias = [];

    @ViewChild('tabela') grid!: Table;

    constructor(
        private categoriaService: CategoriaService,
        private title: Title,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private errorHandlerService: ErrorHandlerService,
    ) {}

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

    excluir(categoria: any) {
        this.confirmationService.confirm({
            message: 'Deseja excluir este registro?',
            accept: () => {
                this.categoriaService.excluir(categoria.id)
                    .then(() => {
                        this.grid.reset();
                        this.messageService.add({severity: 'success', detail: 'Categoria excluída com sucesso!'})
                    })
                    .catch(erro => this.errorHandlerService.handle(erro));
            }
        });
    }

}
