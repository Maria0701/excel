import {
    dateToNormal,
    storage,
} from '../core/utils';

export function toHTML(key) {
    const model =storage(key);
    const id = key.split(':')[1];
    const creationDate = dateToNormal(model.lastOpened);

    return `
    <li class="db__record">
        <a href="#excel/${id}">${model.title}</a>
        <strong>
            ${creationDate} 
            ${new Date(model.lastOpened).toLocaleTimeString()}
        </strong>
    </li>`;
}

function getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key);
    }
    return keys;
}

export function creatDashboardTable() {
    if (localStorage.length === 0) {
        return `<p>Вы пока не создали ни одной таблицы</p>`;
    }
    return getAllRecords();
}

export function getAllRecords() {
    const keys = getAllKeys();
    return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>
    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>`;
}
