import { combineReducers } from 'redux';
import * as constants from '../constants';

export function filters(
    state: any = [],
    action: any
) {
    switch (action.type) {
        case constants.RECEIVE_FILTERS:
            return [...action.filters.data.value];
            
        case constants.TOGGLE_FILTER:
            return Object.assign({}, filters);
        default:
            return state;
    }
}

export function sentence(state: any = '', action: any) {
    switch (action.type) {
        case constants.RECEIVE_SENTENCE:
            return action.sentence;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    sentence,
    filters
});

export default rootReducer;