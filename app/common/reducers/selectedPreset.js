import Immutable from 'immutable';
import { SELECT_PRESET } from '../actions';

const initialState = null;

export default function presets(state = initialState, action) {
    switch (action.type) {
        case SELECT_PRESET:
            return action.preset;
        default:
            return state;
    }
}
