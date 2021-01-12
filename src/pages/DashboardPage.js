import {Page} from '../core/Page';
import {$} from '@core/dom';
import {creatDashboardTable} from './dashboard.functions';

export class DashboardPage extends Page {
    getRoot() {
        const now = Date.now().toString();
        return $.create('div', 'db')
            .html(`
            <div class="db__header">
                <h1>Excel</h1>
            </div>
            <div class="db__new">
                <div class="db__wiev">
                    <a class="db__create" href="/#excel/${now}">
                        shetrujsry67riu
                    </a>
                </div>
            </div>
            <div class="db__table db__wiev">
                ${creatDashboardTable()}                
            </div>
        `);
    }
}
