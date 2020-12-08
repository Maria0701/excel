import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    // возвращает шаблон компонента
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';

        this.prepare();
    }

    prepare() {}

    toHTML() {
        return '';
    }

    init() {
        this.initDomListeners();
    }

    destroy() {
        this.removeDomListeners();
    }
}
