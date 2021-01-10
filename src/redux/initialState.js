import {DEFAULT_STYLES, DEFAULT_TITLE} from '../constants';
import {storage} from '../core/utils';

const defaultState = {
    title: DEFAULT_TITLE,
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: DEFAULT_STYLES,
};

const normalize = state => ({
    ...state,
    currentStyles: DEFAULT_STYLES,
    currentText: '',
});

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState;
