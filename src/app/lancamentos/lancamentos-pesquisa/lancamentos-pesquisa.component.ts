import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentoService, LancamentoFiltro} from "../lancamento.service";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../seguranca/auth.service";

@Component({
    selector: 'app-lancamentos-pesquisa',
    templateUrl: './lancamentos-pesquisa.component.html',
    styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

    lancamentos = [];

    filtro = new LancamentoFiltro();

    totalRegistros = 0;

    @ViewChild('tabela') grid!: Table;

    constructor(
        private lancamentoService: LancamentoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private errorHandlerService: ErrorHandlerService,
        private title: Title,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.title.setTitle('Pesquisa de Lancamentos')
    }

    pesquisar(pagina = 0) {
        this.filtro.pagina = pagina;

        this.lancamentoService.pesquisar(this.filtro)
            .then(resultado => {
                this.totalRegistros = resultado.total;
                this.lancamentos = resultado.lancamentos;
            })
            .catch(erro => this.errorHandlerService.handle(erro));
    }

    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event!.first! / event!.rows!
        this.pesquisar(pagina);
    }

    excluir(lancamento: any) {
        this.confirmationService.confirm({
            message: 'Deseja excluir este registro?',
            accept: () => {
                this.lancamentoService.excluir(lancamento.id)
                    .then(() => {
                        this.grid.reset();
                        this.messageService.add({severity: 'success', detail: 'Lançamento excluído com sucesso!'});
                    })
                    .catch(erro => this.errorHandlerService.handle(erro));
            }
        });
    }

    temPermissao(permissao: string) {
        return this.authService.temPermissao(permissao);
    }
}
