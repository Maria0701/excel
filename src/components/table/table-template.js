import {DEFAULT_STYLES} from '../../constants';
import {parse} from '../../core/parse';
import {toInlineStyles} from '../../core/utils';

const CODES = {
    A: 65,
    Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 25;

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}


function toColumn({col, index, width}) {
    return `<div 
        class="column" 
        data-type="resizable" 
        data-col="${index}" 
        style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>`;
}

function toCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`;
        const data = state.dataState[id];
        const styles = toInlineStyles({
            ...DEFAULT_STYLES,
            ...state.stylesState[id],
        });
        console.log(data);
        return `<div class="cell" 
            contenteditable 
            data-col=${col}
            data-type="cell" 
            data-value="${data || ''}"
            data-id=${id}
            style="${styles};width: ${getWidth(state.colState, col)}" 
            >${parse(data) || ''}</div>`;
    };
}

function createRow(state, el, index = '') {
    const resizer = index
        ? `<div class="row-resize" data-resize="row"></div>`
        : '';

    const isRow = index
        ? `data-row="row"`
        : `data-row="first-row"`;

    const isNotFirstRow = index
        ? `data-type="resizable" 
            style="height: ${getHeight(state, index)}"
            data-row="${index}" 
        `
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

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index),
        };
    };
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z -CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('');

    rows.push(createRow(state, cols));

    for (let row = 0; row < colsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('');

        rows.push(createRow(state.rowState, cells, row + 1));
    }
    return rows.join('');
}
