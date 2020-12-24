import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table-template';
import {resizeHandler} from '@/components/table/table-resize';
import {shoodResize} from '@/components/table/table-functions';
import {TableSelection} from './TableSelection';
import {isCell, matrix, nextSelector, KEY_CODES} from './table-functions';
import {$} from '@core/dom';


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
        return createTable();
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id = "0:0"]');
        this.selectCell($cell);

        this.$on('formula:input', text => {
            this.selection.current.text(text);
        });

        this.$on('formula:enter', () => {
            this.selection.current.focus();
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:move', $cell);
    }

    onMousedown(evt) {
        if (shoodResize(evt)) {
            resizeHandler(this.$root, evt);
        } else if (isCell(evt)) {
            const $target = $(evt.target);

            if (evt.shiftKey) {
                const cells = matrix($target, this.selection.current)
                    .map(id => this.$root
                        .find(`[data-id="${id}"]`));
                this.selection.selectGroup(cells);
            } else {
                this.selection.select($target);
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

    onInput(evt) {
        this.$emit('table:input', $(evt.target));
    }
}

