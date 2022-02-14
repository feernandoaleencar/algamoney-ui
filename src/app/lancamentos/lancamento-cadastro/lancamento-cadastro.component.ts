import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../../categoria/categoria.service";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {PessoaService} from "../../pessoas/pessoa.service";
import {NgForm} from "@angular/forms";
import {Lancamento} from "../../core/model";
import {MessageService} from "primeng/api";
import {LancamentoService} from "../lancamento.service";

import 'moment/moment'
import * as moment from "moment";
import {ActivatedRoute} from "@angular/router";

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

    lancamento: Lancamento = new Lancamento();

    categorias: any = [];

    pessoas: any = [];

    data?: Date;

    constructor(
        private categoriaService: CategoriaService,
        private errorHandlerService: ErrorHandlerService,
        private pessoaService: PessoaService,
        private messageService: MessageService,
        private lancamentoService: LancamentoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        const idLancamento = this.route.snapshot.params['id'];

        if (idLancamento){
            this.editar(idLancamento);
        }

        this.carregarCategorias();
        this.carregarPessoas();
    }

    carregarCategorias() {
        return this.categoriaService.listarCategorias()
            .then(categorias => {
                this.categorias = categorias.map((c: any) => ({label: c.nome, value: c.id}))
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    carregarPessoas() {
        return this.pessoaService.listarPessoas()
            .then(pessoas => {
                this.pessoas = pessoas.map((p: any) => ({label: p.nome, value: p.id}))
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    salvar(lancamentoForm: NgForm) {
        this.lancamento.dataVencimento = moment(this.lancamento.dataVencimento).format('DD/MM/YYYY');
        this.lancamento.dataPagamento = moment(this.lancamento.dataPagamento).format('DD/MM/YYYY');

        this.lancamentoService.Adicionar(this.lancamento)
            .then(() => {
                this.messageService.add({severity: 'success', detail: 'Lançamento adicionado com sucesso!'});
                lancamentoForm.reset();
                this.lancamento = new Lancamento();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    editar(id: number) {
        this.lancamentoService.buscarPorCodigo(id)
            .then(lancamento => {
                this.lancamento = lancamento;
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    get editando(){
        return Boolean(this.lancamento.id);
    }
}
