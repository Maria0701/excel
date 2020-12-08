import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table-template';
import {resizeHandler} from '@/components/table/table-resize';
import {shoodResize} from '@/components/table/table-functions';
import {TableSelection} from './TableSelection';
import {isCell, matrix, nextSelector, KEY_CODES} from './table-functions';
import {$} from '@core/dom';


export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['keydown', 'mousedown'],
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
        this.selection.select($cell);
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
            const newTarget = this.$root
                .find(nextSelector(evtKeyCode, id));
            this.selection.select(newTarget);
        }
    }
}

