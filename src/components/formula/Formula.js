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
        this.$formula = this.$root.find('.input');

        // this.$on('table:input', $cell => {
        //     $formula.text($cell.text());
        // });

        this.$on('table:move', $cell => {
            this.$formula.text($cell.text());
        });

        this.$subscribe(state => {
            console.log('formuls', state.currentText);
            this.$formula.text(state.currentText);
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
