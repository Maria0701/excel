export class Page {
    constructor(params) {
        this.params = params;
    }

    getRoot() {
        throw new Error('method GetRoot should be implemented');
    }

    afterRender() {}

    destroy() {}
}
