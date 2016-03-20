import Immutable from 'immutable';
import { SELECT_PRESET, SHOW_PRESET_INFO } from '../actions';

const initialState = Immutable.fromJS({
    name: null,
    info: {
        title: '',
        genres: [],
        tags: [],
        url: '',
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
        default:
            return state;
    }
}
