import {Component, OnInit} from '@angular/core';
import {LancamentoService, LancamentoFiltro } from "../lancamento.service";
import {LazyLoadEvent} from "primeng/api";

@Component({
    selector: 'app-lancamentos-pesquisa',
    templateUrl: './lancamentos-pesquisa.component.html',
    styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

    lancamentos = [];

    filtro = new LancamentoFiltro();

    totalRegistros = 0;

    constructor(
        private lancamentoService: LancamentoService
    ) { }

    ngOnInit() {
    }

    pesquisar(pagina = 0){
        this.filtro.pagina = pagina;

        this.lancamentoService.pesquisar(this.filtro)
            .then(resultado => {
                this.totalRegistros = resultado.total;
                this.lancamentos = resultado.lancamentos;
            });
    }

    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event!.first! / event!.rows!
        this.pesquisar(pagina);
    }
}
