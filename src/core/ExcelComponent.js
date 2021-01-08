import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    // возвращает шаблон компонента
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.store = options.store;
        this.unsubs = []; // переменная, куда складываем события для отписки
        // this.storeSub = null;
        this.prepare();
    }

    prepare() {}

    toHTML() {
        return '';
    }

    // уведомляем слушателей про события
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    $on(event, fn) {
        // подписываемся на событие и создаем функцию
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubs.push(unsub); // каждое событие добавляем в массив
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    // приходят изменения только по тем полям, на кот подписались
    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn);
    // }

    // инициализируем + добавляем слушатели
    init() {
        this.initDomListeners();
    }

    // удаляем компонент + удаляем слушатели
    destroy() {
        this.removeDomListeners();
        this.unsubs.forEach(unsub => unsub());
    }
}
