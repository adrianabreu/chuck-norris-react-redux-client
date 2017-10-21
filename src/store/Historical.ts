import { Reducer } from 'redux';
import { Sentence } from './Sentence';

// STATE 
export interface HistoricalState {
    sentences: Sentence[];
}

// ACTIONS
export interface AddSentenceAction {
    type: 'ADD_SENTENCE';
    sentence: Sentence;
}

type KnownAction = AddSentenceAction;

// REDUCERS
export const reducer: Reducer<HistoricalState> = (state: HistoricalState, action: KnownAction) => {

    switch (action.type) {
        case 'ADD_SENTENCE':
            let sentences = [...state.sentences];
            if (state.sentences.indexOf(action.sentence) === -1) {
                sentences = [...sentences, action.sentence];
            }
            return { sentences };
        default:
            return state || { sentences: [] };
    }
};
