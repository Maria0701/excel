import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table-template';
import {resizeHandler} from '@/components/table/table-resize';
import {shoodResize} from '@/components/table/table-functions';
import {TableSelection} from './TableSelection';
import {isCell, matrix, nextSelector, KEY_CODES} from './table-functions';
import {$} from '@core/dom';
import * as actions from '../../redux/actions';


export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['keydown', 'mousedown', 'input'],
            ...options,
        });
    }

    toHTML() {
        return createTable(20, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id = "0:0"]');
        this.selectCell($cell);
        console.log(this.store);

        this.$on('formula:input', text => {
            this.selection.current.text(text);
            this.updateTextInStore(text);
        });

        this.$on('formula:enter', () => {
            this.selection.current.focus();
        });

        this.$subscribe(state => {
            console.log('TableState', state);
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:move', $cell);
        this.$dispatch({type: 'TEST'});
    }

    async resiseTable(evt) {
        try {
            const data = await resizeHandler(this.$root, evt);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn('Resize Error', e.message);
        }
    }

    onMousedown(evt) {
        if (shoodResize(evt)) {
            this.resiseTable(evt);
        } else if (isCell(evt)) {
            const $target = $(evt.target);

            if (evt.shiftKey) {
                const cells = matrix($target, this.selection.current)
                    .map(id => this.$root
                        .find(`[data-id="${id}"]`));
                this.selection.selectGroup(cells);
            } else {
                this.selectCell($target);
            }
        }
    }

    onKeydown(evt) {
        if (!Object.values(KEY_CODES)
            .includes(evt.keyCode)) return;
        if (!evt.shiftKey) {
            evt.preventDefault();
            const evtKeyCode = evt.keyCode;
            const id = this.selection.current.id(true);
            const $next = this.$root
                .find(nextSelector(evtKeyCode, id));
            this.selectCell($next);
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value,
        }));
    }

    onInput(evt) {
        // this.$emit('table:input', $(evt.target));
        this.updateTextInStore($(evt.target).text());
    }
}

