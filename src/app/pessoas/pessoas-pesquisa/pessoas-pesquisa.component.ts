import {Component, OnInit, ViewChild} from '@angular/core';
import {PessoaFiltro, PessoaService} from "../pessoa.service";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-pessoas-pesquisa',
    templateUrl: './pessoas-pesquisa.component.html',
    styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

    pessoas = [];

    filtro = new PessoaFiltro();

    totalRegistros = 0;

    @ViewChild('tabela') grid!: Table;

    constructor(
        private pessoaService: PessoaService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title
    ) {
    }

    ngOnInit(): void {
        this.title.setTitle('Pesquisa de Pessoas');

    }

    pesquisar(pagina = 0) {
        this.filtro.pagina = pagina;

        this.pessoaService.pesquisar(this.filtro)
            .then(resultado => {
                this.totalRegistros = resultado.total;
                this.pessoas = resultado.pessoas;
            })

    }

    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event!.first! / event!.rows!
        this.pesquisar(pagina);
    }

    excluir(pessoa: any) {
        this.confirmationService.confirm({
            message: 'Deseja excluir este registro?',
            accept: () => {
                this.pessoaService.excluir(pessoa.id)
                    .then(() => {
                        this.grid.reset();
                        this.messageService.add({severity: 'success', detail: 'Pessoa excluída com sucesso!'})
                    })
                    .catch(erro => this.errorHandlerService.handle(erro));
            }
        });
    }

    ativarOuInativar(pessoa: any) {
        const novoStatus = !pessoa.ativo;

        this.pessoaService.mudarStatus(pessoa.id, novoStatus)
            .then(() => {
                const acao = novoStatus ? 'ativada' : 'desativada';

                pessoa.ativo = novoStatus;

                this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!`})
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }
}
