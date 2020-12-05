import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table-template';
import {resizeHandler} from '@/components/table/table-resize';
import {shoodResize} from '@/components/table/table-functions';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown'],
        });
    }

    toHTML() {
        return createTable();
    }

    onMousedown(evt) {
        if (shoodResize(evt)) {
            resizeHandler(this.$root, evt);
        }
    }
}
