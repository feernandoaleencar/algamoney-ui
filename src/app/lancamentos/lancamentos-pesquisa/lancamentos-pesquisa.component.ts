import {Component, OnInit} from '@angular/core';
import {LancamentoService, LancamentoFiltro } from "../lancamento.service";

@Component({
    selector: 'app-lancamentos-pesquisa',
    templateUrl: './lancamentos-pesquisa.component.html',
    styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

    lancamentos = [];

    filtro = new LancamentoFiltro();

    constructor(
        private lancamentoService: LancamentoService
    ) { }

    ngOnInit() {
        this.pesquisar();
    }

    pesquisar(){
        this.lancamentoService.pesquisar(this.filtro)
            .then(resultado => {
                this.lancamentos = resultado.lancamentos;
            });
    }
}
