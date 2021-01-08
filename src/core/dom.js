class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }

        return this.$el.outerHTML.trim();
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text;
            return this;
        }

        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        }

        return this.$el.textContent;
    }

    clear() {
        this.html('');
        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    get data() {
        return this.$el.dataset;
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles = {}) {
        Object.keys(styles)
            .forEach(key => {
                this.$el.style[key] = styles[key];
            });
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s];
            return res;
        }, {});
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1],
            };
        }
        return this.data.id;
    }

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value);
            return this;
        }

        return this.$el.getAttribute(name);
    }

    focus() {
        this.$el.focus();
        if (typeof window.getSelection !== 'undefined'
            && typeof document.createRange !== 'undefined') {
            const range = document.createRange();
            range.selectNodeContents(this.$el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange !== 'undefined') {
            const textRange = document.body.createTextRange();
            textRange.moveToElementText(this.$el);
            textRange.collapse(false);
            textRange.select();
        }

        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}


$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }

    return $(el);
};
