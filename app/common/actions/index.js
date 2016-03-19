import fetch from 'isomorphic-fetch';

export const SELECT_PRESET = 'SELECT_PRESET';

export function selectPreset(preset) {
    return {
        type: SELECT_PRESET,
        preset
    }
}
