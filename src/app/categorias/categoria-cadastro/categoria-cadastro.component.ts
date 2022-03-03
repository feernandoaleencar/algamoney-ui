import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Categoria} from "../../core/model";
import {CategoriaService} from "../categoria.service";
import {MessageService} from "primeng/api";
import {ErrorHandlerService} from "../../core/error-handler.service";

@Component({
    selector: 'app-categoria-cadastro',
    templateUrl: './categoria-cadastro.component.html',
    styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

    categoria = new Categoria();

    constructor(
        private categoriaService: CategoriaService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private messageService: MessageService,
        private errorHandlerService: ErrorHandlerService
    ) { }

    ngOnInit(): void {
        this.title.setTitle('Nova Categoria');

        const idCategoria = this.route.snapshot.params['id'];

        if(idCategoria) {
            this.editar(idCategoria);
        }
    }

    salvar(categoriaForm: NgForm) {
        if(this.editando){
            this.atualizar(categoriaForm);
        } else {
            this.adicionar(categoriaForm);
        }
    }

    adicionar(categoriaForm: NgForm) {
        this.categoriaService.adicionar(this.categoria)
            .then(categoria => {
                this.messageService.add({severity: 'success', detail: 'Categoria adicionada com sucesso!'});

                this.router.navigate(['/categorias', categoria.id])
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    atualizar(categoriaForm: NgForm) {
        this.categoriaService.atualizar(this.categoria)
            .then(categoria => {
                this.categoria = categoria;

                this.messageService.add({severity: 'success', detail: 'Categoria atualizada com sucesso!'});

                this.atualizarTitle();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    editar(id: number) {
        this.categoriaService.buscarPorCodigo(id)
            .then(categoria => {
                console.log("Aqui" + categoria)
                this.categoria = categoria;
                this.atualizarTitle();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    get editando() {
        return Boolean(this.categoria.id);
    }

    novo(categoriaForm: NgForm) {
        categoriaForm.reset(new Categoria);
        this.router.navigate(['/categorias/nova'])
    }

    atualizarTitle(){
        this.title.setTitle(`Edição de categoria: ${this.categoria.nome}`)
    }

}
