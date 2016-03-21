import Immutable from 'immutable';
import { SELECT_PRESET, SHOW_PRESET_INFO, HIDE_PRESET_INFO } from '../actions';

const initialState = Immutable.fromJS({
    name: null,
    info: {
        title: '',
        genres: [],
        tags: [],
        playlistUrl: '',
        streamUrl: '',
        visible: false
    }
});

export default function selectedPreset(state = initialState, action) {
    switch (action.type) {
        case SELECT_PRESET:
            return state.merge({
                name: action.name,
                info: state.get('info').merge(action.info)
            });
        case SHOW_PRESET_INFO:
            return state.setIn(['info', 'visible'], true);
        case HIDE_PRESET_INFO:
            return state.setIn(['info', 'visible'], false);
        default:
            return state;
    }
}
