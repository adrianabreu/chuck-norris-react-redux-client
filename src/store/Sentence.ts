import { Reducer } from 'redux';
import { AppThunkAction } from './';

const API_URL = 'http://api.icndb.com/jokes/random';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SentenceState {
    sentence: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

interface RequestSentenceAction {
    type: 'FETCH_SENTENCE';
}

interface ReceiveSentenceAction {
    type: 'RECEIVE_SENTENCE';
    sentence: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestSentenceAction | ReceiveSentenceAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

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

// ----------------
// REDUCER - For a given state and action, returns the new state. 
// To support time travel, this must not mutate the old state.

export const reducer: Reducer<SentenceState> = (state: SentenceState, action: KnownAction) => {

    switch (action.type) {
        case 'RECEIVE_SENTENCE':
            return {
                sentence: action.sentence
            };
        default:
            // For unrecognized actions (or in cases where actions have no effect), must return the existing state
            //  (or default initial state if none was supplied)
            return state || { sentence: '' };
    }
};
