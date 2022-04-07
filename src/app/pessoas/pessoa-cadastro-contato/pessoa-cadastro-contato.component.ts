import {Component, Input, OnInit} from '@angular/core';
import {Contato} from "../../core/model";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-pessoa-cadastro-contato',
    templateUrl: './pessoa-cadastro-contato.component.html',
    styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

    @Input() contatos!: Array<Contato>;
    exbindoFormularioContato: boolean = false;
    contato?: Contato;
    contatoIndex?: number;

    constructor() {
    }

    ngOnInit(): void {
    }

    prepararNovoContato() {
        this.exbindoFormularioContato = true;

        this.contato = new Contato();

        this.contatoIndex = this.contatos.length;
    }

    confirmarContato(frm: NgForm) {
        this.contatos[this.contatoIndex!] = this.clonarContato(this.contato!);

        this.exbindoFormularioContato = false;

        frm.reset();
    }

    clonarContato(contato: Contato): Contato {
        return new Contato(contato.id, contato.nome, contato.email, contato.telefone);
    }

    prepararEdicaoContato(contato: Contato, id: number) {
        this.contato = this.clonarContato(contato);

        this.exbindoFormularioContato = true;

        this.contatoIndex = id;
    }

    removerContato(index: number) {
        this.contatos.splice(index, 1);
    }

    get editando() {
        return this.contato && this.contato.id;
    }

}
