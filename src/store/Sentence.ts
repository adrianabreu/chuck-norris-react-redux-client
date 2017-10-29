import { Reducer } from 'redux';
import { AppThunkAction } from './';
import { AddSentenceAction } from './Historical';

const API_URL = 'http://api.icndb.com/jokes/random';

export interface Sentence {
    value: string;
    categories: string[];
}

// STATE 
export interface SentenceState {
    sentence: Sentence;
}

// ACTIONS
interface RequestSentenceAction {
    type: 'FETCH_SENTENCE';
}

interface ReceiveSentenceAction {
    type: 'RECEIVE_SENTENCE';
    sentence: Sentence;
}

type KnownAction = RequestSentenceAction | ReceiveSentenceAction | AddSentenceAction;

// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
export const actionCreators = {
    requestSentence: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const filteredParams = getState().filters.filters
            .filter(filter => filter.selected);

        const params = filteredParams.length > 0 ? '?limitTo=[' + getState().filters.filters
            .filter(filter => filter.selected)
            .map(filter => filter.value) + ']' : '';

        fetch(API_URL + params)
            .then(response => response.json())
            .then((response) => {
                dispatch(
                    {
                        type: 'RECEIVE_SENTENCE',
                        sentence: {
                            value: response.value.joke,
                            categories: response.value.categories
                        }
                    });
                dispatch({
                    type: 'ADD_SENTENCE',
                    sentence: {
                        value: response.value.joke,
                        categories: response.value.categories
                    }
                });
            }
            );
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
            return state || {
                sentence: {
                    value: '',
                    categories: []
                }
            };
    }
};
