import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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

    //lancamento: Lancamento = new Lancamento();

    categorias: any = [];

    pessoas: any = [];

    data?: Date;

    formulario!: FormGroup;
    uploadEmAndamento: boolean = false;

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

        if (idLancamento) {
            this.editar(idLancamento);
        }

        this.carregarCategorias();
        this.carregarPessoas();
    }

    configurarFormulario() {
        this.formulario = this.formBuilder.group({
            id: [],
            tipo: ['RECEITA', Validators.required],
            dataVencimento: [null, Validators.required],
            dataPagamento: [],
            descricao: [null, [this.validarCampoObrigatorio, this.validarTamanhoMinimo(5)]],
            valor: [null, Validators.required],
            pessoa: this.formBuilder.group({
                id: [null, Validators.required],
                nome: [],
            }),
            categoria: this.formBuilder.group({
                id: [null, Validators.required],
                nome: [],
            }),
            observacao: [],
            anexo: [],
            urlAnexo: []
        });
    }

    validarCampoObrigatorio(input: FormControl) {
        return (input.value ? null : {obrigatorio: true})
    }

    validarTamanhoMinimo(valor: number) {
        return (input: FormControl) => {
            return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho: valor}}
        };
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

    salvar() {
        if (this.editando) {
            this.atualizarLancamento();
        } else {
            this.adicionarLancamento();
        }
    }

    adicionarLancamento() {

        this.lancamentoService.Adicionar(this.formulario.value)
            .then(lancamento => {
                this.messageService.add({severity: 'success', detail: 'Lan??amento adicionado com sucesso!'});
                // lancamentoForm.reset();
                // this.lancamento = new Lancamento();
                this.router.navigate(['/lancamentos', lancamento.id])
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    atualizarLancamento() {

        this.lancamentoService.atualizar(this.formulario.value)
            .then((lancamento: Lancamento) => {
                this.formulario.patchValue(lancamento)
                this.messageService.add({severity: 'success', detail: 'Lancamento atualizado com sucesso!'});
                this.atualizarTitle();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    editar(id: number) {
        this.lancamentoService.buscarPorCodigo(id)
            .then(lancamento => {
                //this.lancamento = lancamento;
                this.formulario.patchValue(lancamento);
                this.atualizarTitle();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    get editando() {
        return Boolean(this.formulario.get('id')!.value);
    }

    novo() {
        this.formulario.reset(new Lancamento);
        this.router.navigate(['/lancamentos/novo'])
    }

    atualizarTitle() {
        this.title.setTitle(`Edi????o de lan??amento: ${this.formulario.get('descricao')?.value}`)
    }

    get urlUploadAnexo() {
        return this.lancamentoService.urlUploadAnexo();

    }

    get uploadHeaders() {
        return this.lancamentoService.uploadHeaders();
    }

    antesUploadAnexo() {
        this.uploadEmAndamento = true;
    }

    aoTerminarUploadAnexo(event: any) {
        const anexo = event.originalEvent.body;

        this.formulario.patchValue({
            anexo: anexo.nome,
            urlAnexo: anexo.url
        });

        this.uploadEmAndamento = false;
    }

    get nomeAnexo() {
        const nome = this.formulario?.get('anexo')?.value;

        if (nome) {
            return nome.substring(nome.indexOf('_') + 1, nome.length);
        }

        return '';
    }

    erroUpload(event: any) {
        this.messageService.add({severity: 'error', detail: 'Erro ao tentar enviar anexo!'});

        this.uploadEmAndamento = false;
    }

    removerAnexo() {
        this.formulario.patchValue({
            anexo: null,
            urlAnexo: null
        });
    }

    configurarURLcomProtocolo() {
        return `https://${this.formulario.get('urlAnexo')?.value}`;
    }
}
