import { fromJS } from 'immutable';
import { SELECT_RADIO, UPDATE_SELECTED_RADIO } from '../actions';

const initialState = fromJS({
    preset: 'custom',
    info: {
        title: '',
        genres: '',
        tags: '',
        playlistUrl: '',
        streamUrl: ''
    }
});

export default function selectedRadio(state = initialState, action) {
    switch (action.type) {
        case SELECT_RADIO:
            return state.set('preset', action.preset);
        case UPDATE_SELECTED_RADIO:
            return state.mergeIn(['info'], action.info);
        default:
            return state;
    }
}
