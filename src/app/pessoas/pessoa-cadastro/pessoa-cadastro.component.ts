import {Component, OnInit} from '@angular/core';
import {Contato, Pessoa} from "../../core/model";
import {FormControl, NgForm} from "@angular/forms";
import {PessoaService} from "../pessoa.service";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-pessoa-cadastro',
    templateUrl: './pessoa-cadastro.component.html',
    styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

    pessoa = new Pessoa();
    estados: any[] = [];
    municipios: any[] = [];
    estadoSelecionado?: number;

    constructor(
        private pessoaService: PessoaService,
        private errorHandlerService: ErrorHandlerService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title
    ) { }

    ngOnInit(): void {
        this.title.setTitle('Nova Pessoa');

        const idPessoa = this.route.snapshot.params['id'];

        this.carregarEstados();

        if (idPessoa){
            this.editar(idPessoa);
        }
    }

    salvar(pessoaForm: NgForm){
        if (this.editando){
           this.atualizarPessoa(pessoaForm);
        } else {
           this.adicionarPessoa(pessoaForm);
        }
    }

    adicionarPessoa(pessoaForm: NgForm){

        this.pessoaService.adicionar(this.pessoa)
            .then(pessoa => {
                this.messageService.add({severity: 'success', detail: 'Pessoa adicionada com sucesso!'});

                this.router.navigate(['/pessoas', pessoa.id])
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    atualizarPessoa(pessoaForm: NgForm){

        this.pessoaService.atualizar(this.pessoa)
            .then(pessoa => {
                this.pessoa = pessoa;
                this.messageService.add({severity: 'success', detail: 'Pessoa atualizado com sucesso!'});
                this.atualizarTitle();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    editar(id: number) {
        this.pessoaService.buscarPorCodigo(id)
            .then(pessoa => {
                this.pessoa = pessoa;

                this.estadoSelecionado = (this.pessoa.endereco.municipio) ? this.pessoa.endereco.municipio.estado.codigo : undefined;

                if (this.estadoSelecionado) {
                    this.carregarMunicipios();
                }

                this.atualizarTitle();
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    get editando(){
        return Boolean(this.pessoa.id);
    }

    novo(pessoaForm: NgForm) {
        pessoaForm.reset(new Pessoa);
        this.router.navigate(['/pessoas/nova'])
    }

    atualizarTitle(){
        this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`)
    }

    carregarEstados(){
        this.pessoaService.listarEstados()
            .then(lista => {
                this.estados = lista.map(uf => ({ label: uf.nome + " - " + uf.uf, value: uf.codigo}))
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    carregarMunicipios() {
        this.pessoaService.pesquisarMunicipios(this.estadoSelecionado!)
            .then(lista => {
                this.municipios = lista.map(mun => ({
                    label: mun.nome,
                    value: mun.codigoIbge
                }));
                if (this.estadoSelecionado !== this.pessoa.endereco.municipio.estado.codigo)
                    this.pessoa.endereco.municipio.codigoIbge = undefined;
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }
}
