import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click', 'keydown'],
            ...options,
        });
    }

    init() {
        super.init();
        const inputField = this.$root.find('.input');

        this.$on('table:input', $cell => {
            inputField.text($cell.text());
        });

        this.$on('table:move', $cell => {
            inputField.text($cell.text());
        });
    }

    toHTML() {
        return `
        <div class="info">fx</div>
        <div class="input" contenteditable="true" spellcheck="false"></div>`;
    }

    onInput(evt) {
        this.$emit('formula:input', $(evt.target).text());
    }

    onKeydown(evt) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(evt.key)) {
            evt.preventDefault();
            this.$emit('formula:enter');
        }
    }

    onClick(evt) {}
}
