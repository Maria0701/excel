import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table-template';
import {resizeHandler} from '@/components/table/table-resize';
import {shoodResize} from '@/components/table/table-functions';
import {TableSelection} from './TableSelection';
import {isCell, matrix, nextSelector, KEY_CODES} from './table-functions';
import {$} from '@core/dom';
import * as actions from '../../redux/actions';
import {DEFAULT_STYLES} from '../../constants';
import {parse} from '../../core/parse';

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

        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value));
            // this.selection.current.text(value);
            this.updateTextInStore(value);
        });

        this.$on('formula:enter', () => {
            this.selection.current.focus();
        });

        this.$on('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds,
            }));
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:move', $cell);
        const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));
        this.$dispatch(actions.changeStyles(styles));
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
        const text = $(evt.target).text();
        this.updateTextInStore(text);
        $(evt.target).attr('data-value', text);
    }
}

