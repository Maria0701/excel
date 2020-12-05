import {$} from '@core/dom';

export function resizeHandler($root, evt) {
    const $resizer = $(evt.target);
    const dataResizVal = $resizer.$el.dataset.resize;
    const $parent = $resizer.closest('[data-type="resizable"]');
    const sideProp = dataResizVal === 'col'
        ? 'bottom'
        : 'right';

    let value;
    const coords = $parent.getCoords();

    $resizer.css({
        'opacity': 1,
        'z-index': 4,
        [sideProp]: '-5000px',
    });

    if (dataResizVal === 'col') {
        document.onmousemove = e => {
            const delta = e.pageX - coords.right;
            value = coords.width + delta;
            $resizer.css({right: `-${delta}px`});
        };
    } else {
        document.onmousemove = e => {
            const delta = e.pageY - coords.bottom;
            value = coords.height + delta;
            $resizer.css({
                'bottom': `-${delta}px`,
            });
        };
    }

    document.onmouseup = () => {
        document.onmousemove = null;
        const cells =$root
            .findAll(`[data-col="${$parent.data.col}"]`);
        if (dataResizVal === 'col') {
            $parent.css({
                'width': `${value}px`,
            });
            cells.forEach(el => el.style.width = `${value}px`);
        } else {
            $parent.css({
                'height': `${value}px`,
            });
        }
        $resizer.css({
            'opacity': 0,
            'z-index': 0,
            'bottom': 0,
            'right': 0,
        });
    };
}
