import {debounce} from '@/core/utils';

export class StateProcessor {
    constructor(saver, delay = 300) {
        this.listen = debounce(this.listen.bind(this), delay);
        this.saver = saver;
    }

    listen(state) {
        this.saver.save(state);
    }

    get() {
        return this.saver.get();
    }
}
