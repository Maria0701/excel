import {range} from '../../core/utils';

export function shoodResize(evt) {
    return evt.target.dataset.resize;
}

export function isCell(evt) {
    return evt.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
    const target = $target.id(true);
    const current = $current.id(true);
    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`));
        return acc;
    }, []);
}

export const KEY_CODES = {
    arrowDown: 40,
    arrowUp: 38,
    arrowLeft: 37,
    arrowRight: 39,
    keyTab: 9,
    keyEnter: 13,
};

export function nextSelector(key, {row, col}) {
    const MIN_VALUE = 0;
    switch (key) {
    case KEY_CODES.arrowDown:
    case KEY_CODES.keyEnter:
        row ++;
        break;
    case KEY_CODES.arrowUp:
        row = row - 1 < MIN_VALUE
            ? MIN_VALUE
            : row -= 1;
        break;
    case KEY_CODES.arrowLeft:
        col = col - 1 < MIN_VALUE
            ? MIN_VALUE
            : col -= 1;
        break;
    case KEY_CODES.arrowRight:
    case KEY_CODES.keyTab:
        col ++;
        break;
    }
    return `[data-id="${row}:${col}"]`;
}
