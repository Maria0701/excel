export class Page {
    constructor(params) {
        this.params = params || Date.now().toString();
    }

    getRoot() {
        throw new Error('method GetRoot should be implemented');
    }

    afterRender() {}

    destroy() {}
}
