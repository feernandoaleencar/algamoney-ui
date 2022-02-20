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

    salvar(lancamentoForm: NgForm){
        if (this.editando){
           // this.atualizarLancamento(lancamentoForm);
        } else {
            this.adicionarPessoa(lancamentoForm);
        }
    }

    adicionarPessoa(pessoaForm: NgForm){

        this.pessoaService.adicionar(this.pessoa)
            .then(() => {
                this.messageService.add({severity: 'success', detail: 'Pessoa adicionada com sucesso!'});

                pessoaForm.reset();
                this.pessoa = new Pessoa();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    editar(id: number) {
        this.pessoaService.buscarPorCodigo(id)
            .then(pessoa => {
                this.pessoa = pessoa;
                this.atualizarTitle();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    get editando(){
        return Boolean(this.pessoa.id);
    }

    atualizarTitle(){
        this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`)
    }

}
