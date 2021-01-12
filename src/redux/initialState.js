import {DEFAULT_STYLES, DEFAULT_TITLE} from '../constants';
import {clone} from '../core/utils';

const defaultState = {
    title: DEFAULT_TITLE,
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: DEFAULT_STYLES,
    lastOpened: (new Date()).toJSON(),
};

const normalize = state => ({
    ...state,
    currentStyles: DEFAULT_STYLES,
    currentText: '',
});


export function normalizeInitialState(state) {
    return state
        ? normalize(state)
        : clone(defaultState);
}
