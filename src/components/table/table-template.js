const CODES = {
    A: 65,
    Z: 90,
};

function toColumn(el, index) {
    return `<div class="column" data-type="resizable" data-col="${index}">
            ${el}
            <div class="col-resize" data-resize="col"></div>
        </div>`;
}

function toCell(row) {
    return function(_, col) {
        return `<div class="cell" 
            contenteditable 
            data-col=${col}
            data-type="cell" 
            data-id=${row}:${col}></div>`;
    };
}

function createRow(el, index = '') {
    const resizer = index
        ? `<div class="row-resize" data-resize="row"></div>`
        : '';

    const isRow = index
        ? `data-row="row"`
        : `data-row="first-row"`;

    const isNotFirstRow = index
        ? `data-type="resizable"`
        : ``;

    return `<div class="row" ${isNotFirstRow}>
    <div class="row-info">
        ${index}
        ${resizer}
    </div>
    <div class="row-data" ${isRow}>${el}</div>
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

    rows.push(createRow(cols));

    for (let row = 0; row < colsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, col) => toCell(row, col))
            .map( toCell(row))
            .join('');

        rows.push(createRow(cells, row + 1));
    }
    return rows.join('');
}
