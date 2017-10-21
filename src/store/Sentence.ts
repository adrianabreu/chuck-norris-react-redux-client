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
        fetch(API_URL)
            .then(response => response.json())
            .then((response: any) =>
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
