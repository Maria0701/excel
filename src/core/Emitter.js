export class Emitter {
    constructor() {
        this.listeners = {};
    }

    // уведомляем слушателей, если они есть
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach(listener => {
            listener(...args);
        });
        return true;
    }

    // подписываемся на уведомления
    // доб. нового слушателя
    subscribe(event, fn) { // второй аргумент - колбэк (функция)
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] =
                this.listeners[event]
                    .filter(listener => listener !== fn);
        };
    }
}
