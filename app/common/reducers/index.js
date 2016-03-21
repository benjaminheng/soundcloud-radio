import { combineReducers } from 'redux';
import selectedPreset from './selectedPreset';
import customRadio from './customRadio';

const rootReducer = combineReducers({
    selectedPreset,
    customRadio
});

export default rootReducer;
