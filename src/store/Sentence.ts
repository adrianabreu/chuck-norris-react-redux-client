import { Reducer } from 'redux';
import { AppThunkAction } from './';

const API_URL = 'http://api.icndb.com/jokes/random';

// STATE 
export interface SentenceState {
    sentence: string;
}

// ACTIONS
interface RequestSentenceAction {
    type: 'FETCH_SENTENCE';
}

interface ReceiveSentenceAction {
    type: 'RECEIVE_SENTENCE';
    sentence: string;
}

type KnownAction = RequestSentenceAction | ReceiveSentenceAction;

// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
export const actionCreators = {
    requestSentence: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const params = '?limitTo=[' + getState().filters.filters
            .filter(filter => filter.selected)
            .map(filter => filter.value) + ']';
        fetch(API_URL + params)
            .then(response => response.json())
            .then((response) =>
                dispatch(
                    {
                        type: 'RECEIVE_SENTENCE',
                        sentence: response.value.joke
                    }));
    }
};

// REDUCERS
export const reducer: Reducer<SentenceState> = (state: SentenceState, action: KnownAction) => {

    switch (action.type) {
        case 'RECEIVE_SENTENCE':
            return {
                sentence: action.sentence
            };
        default:
            return state || { sentence: '' };
    }
};
