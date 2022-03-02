import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Categoria, Pessoa} from "../../core/model";

@Component({
    selector: 'app-categoria-cadastro',
    templateUrl: './categoria-cadastro.component.html',
    styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

    categoria = new Categoria();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private title: Title
    ) { }

    ngOnInit(): void {
        this.title.setTitle('Nova Categoria');

    }

    salvar(categoriaForm: NgForm) {

    }

    get editando() {
        return Boolean(this.categoria.id);
    }

    novo(categoriaForm: NgForm) {
        categoriaForm.reset(new Categoria());
        this.router.navigate(['/categorias/nova'])
    }

}
