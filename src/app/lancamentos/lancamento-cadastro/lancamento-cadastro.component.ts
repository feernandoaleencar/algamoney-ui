import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

import {CategoriaService} from "../../categorias/categoria.service";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {PessoaService} from "../../pessoas/pessoa.service";
import {Lancamento} from "../../core/model";

import {MessageService} from "primeng/api";
import {LancamentoService} from "../lancamento.service";

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

    formulario: FormGroup;

    constructor(
        private categoriaService: CategoriaService,
        private errorHandlerService: ErrorHandlerService,
        private pessoaService: PessoaService,
        private messageService: MessageService,
        private lancamentoService: LancamentoService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.configurarFormulario();
        this.title.setTitle('Novo Lancamento')
        const idLancamento = this.route.snapshot.params['id'];

        if (idLancamento){
            this.editar(idLancamento);
        }

        this.carregarCategorias();
        this.carregarPessoas();
    }

    configurarFormulario(){
        this.formulario = this.formBuilder.group({
            id: [],
            tipo: ['RECEITA', Validators.required],
            dataVencimento: [null, Validators.required],
            dataPagamento: [],
            descricao: [null, [Validators.required, Validators.minLength(5)]],
            valor: [null, Validators.required],
            pessoa: this.formBuilder.group({
               id: [null, Validators.required],
               nome: []
            }),
            categoria: this.formBuilder.group({
               id: [null, Validators.required],
               nome: [null, Validators.required],
            }),
            observacao: []
        });
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

    salvar(lancamentoForm: NgForm){
        if (this.editando){
            this.atualizarLancamento(lancamentoForm);
        } else {
            this.adicionarLancamento(lancamentoForm);
        }
    }

    adicionarLancamento(lancamentoForm: NgForm) {

        this.lancamentoService.Adicionar(this.lancamento)
            .then(lancamento => {
                this.messageService.add({severity: 'success', detail: 'Lançamento adicionado com sucesso!'});
               // lancamentoForm.reset();
               // this.lancamento = new Lancamento();
               this.router.navigate(['/lancamentos', lancamento.id])
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    atualizarLancamento(lancamentoForm: NgForm){

        this.lancamentoService.atualizar(this.lancamento)
            .then(lancamento => {
                this.lancamento = lancamento;
                this.messageService.add({severity: 'success', detail: 'Lancamento atualizado com sucesso!'});
                this.atualizarTitle();
        })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    editar(id: number) {
        this.lancamentoService.buscarPorCodigo(id)
            .then(lancamento => {
                this.lancamento = lancamento;
                this.atualizarTitle();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    get editando(){
        return Boolean(this.lancamento.id);
    }

    novo(lancamentoForm: NgForm) {
        lancamentoForm.reset(new Lancamento);
        this.router.navigate(['/lancamentos/novo'])
    }

    atualizarTitle(){
        this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`)
    }
}
