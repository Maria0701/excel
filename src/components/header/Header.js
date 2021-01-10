import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '../../redux/actions';
import {DEFAULT_TITLE} from '../../constants';
import {debounce} from '../../core/utils';

export class Header extends ExcelComponent {
    static className = 'excel__header';
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options,
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }

    toHTML() {
        const title = this.store.getState().title || DEFAULT_TITLE;
        return `
        <input class="input" type="text" value="${title}" />
        <div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>
            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>`;
    }

    onInput(evt) {
        const $target = $(evt.target);
        this.$dispatch(changeTitle($target.text()));
    }
}
