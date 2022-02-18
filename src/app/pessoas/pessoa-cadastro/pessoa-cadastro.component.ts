import {Component, OnInit} from '@angular/core';
import {Pessoa} from "../../core/model";
import {NgForm} from "@angular/forms";
import {PessoaService} from "../pessoa.service";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-pessoa-cadastro',
    templateUrl: './pessoa-cadastro.component.html',
    styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

    pessoa = new Pessoa();

    constructor(
        private pessoaService: PessoaService,
        private errorHandlerService: ErrorHandlerService,
        private messageService: MessageService,
        private title: Title
    ) { }

    ngOnInit(): void {
        this.title.setTitle('Nova Pessoa');
    }

    salvar(pessoaForm: NgForm){

        this.pessoaService.adicionar(this.pessoa)
            .then(() => {
                this.messageService.add({severity: 'success', detail: 'Pessoa adicionada com sucesso!'});

                pessoaForm.reset();
                this.pessoa = new Pessoa();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

}
