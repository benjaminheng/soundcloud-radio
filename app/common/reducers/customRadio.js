import { fromJS } from 'immutable';
import { UPDATE_CUSTOM_RADIO } from '../actions';

const initialState = fromJS({
    title: '',
    genres: [], 
    tags: [],
    playlistUrl: '',
    streamUrl: '',
});

export default function customRadio(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CUSTOM_RADIO:
            return state.merge(action.info);
        default:
            return state;
    }
}
