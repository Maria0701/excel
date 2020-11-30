import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click'],
        });
    }

    toHTML() {
        return `
        <div class="info">fx</div>
        <div class="input" contenteditable="true" spellcheck="false"></div>`;
    }

    onInput(evt) {
        if (evt.target.textContent === 'text') {
            console.log(evt.target.textContent, this.$root);
            this.$root.off('input', this.onInput);
        }
    }

    onClick(evt) {

    }
}
