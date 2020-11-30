const CODES = {
    A: 65,
    Z: 90,
};

function toColumn(el) {
    return `<div class="column">${el}</div>`;
}

function toCell(el, contenteditable = false) {
    return `<div class="cell" contenteditable=${contenteditable}>${el}</div>`;
}

function createRow(el, index = '') {
    return `<div class="row">
    <div class="row-info">${index}</div>
    <div class="row-data">${el}</div>
    </div>`;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z -CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');

    console.log(cols);

    rows.push(createRow(cols));

    for (let i = 0; i < colsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(el => toCell(el, 'true'))
            .join('');

        rows.push(createRow(cells, i + 1));
    }
    return rows.join('');
}
