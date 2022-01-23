import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-message',
    template: `
        <div class="mensagem">
            <p-message *ngIf="temErro()" severity="error"
                       text="{{ text }}">
            </p-message>
        </div>
    `,
    styles: [
        `
            .mensagem {
                margin-top: 5px;
            }
        `
    ]
})
export class MessageComponent {

    @Input() error: string = '';
    @Input() control: any;
    @Input() text: string = '';

    temErro(): boolean {
        return this.control.hasError(this.error) && this.control.dirty;
    }

}
