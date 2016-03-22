import fetch from 'isomorphic-fetch';

export const SELECT_RADIO = 'SELECT_RADIO';
export const UPDATE_SELECTED_RADIO = 'UPDATE_SELECTED_RADIO';

export function selectRadio(preset) {
    return {
        type: SELECT_RADIO,
        preset
    }
}

export function updateSelectedRadio(info) {
    return {
        type: UPDATE_SELECTED_RADIO,
        info
    }
}
