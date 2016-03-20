import fetch from 'isomorphic-fetch';

export const SELECT_PRESET = 'SELECT_PRESET';
export const SHOW_PRESET_INFO = 'SHOW_PRESET_INFO';
export const HIDE_PRESET_INFO = 'HIDE_PRESET_INFO';

export function selectPreset(name, info) {
    return {
        type: SELECT_PRESET,
        name,
        info
    }
}

export function showPresetInfo() {
    return {
        type: SHOW_PRESET_INFO
    }
}

export function hidePresetInfo() {
    return {
        type: HIDE_PRESET_INFO
    }
}
