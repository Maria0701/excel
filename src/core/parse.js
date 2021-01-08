export function parse(val = '') {
    if (val.startsWith('=')) {
        try {
            val = val.slice(1);
            return eval(val);
        } catch (e) {
            return val;
        }
    }
    return val;
}
