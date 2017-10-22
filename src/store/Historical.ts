import { Reducer } from 'redux';
import { Sentence } from './Sentence';
import { Filter } from './Filter';
import { AppThunkAction } from './';

// STATE 
export interface HistoricalState {
    sentences: Sentence[];
    visibleSentences: Sentence[];
    historicalFilter: Filter[];
}

// ACTIONS
export interface AddSentenceAction {
    type: 'ADD_SENTENCE';
    sentence: Sentence;
}

export interface ToggleFilterAction {
    type: 'TOGGLE_HISTORICAL_FILTER';
    index: number;
}

export interface CleanHistoricalAction {
    type: 'CLEAN_HISTORICAL';
}

type KnownAction = AddSentenceAction & ToggleFilterAction;

export const actionCreators = {
    toggleFilter: (index: number): AppThunkAction<ToggleFilterAction> => (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_HISTORICAL_FILTER',
            index: index
        });
    },
    cleanHistorical: (): AppThunkAction<CleanHistoricalAction> => (dispatch, getState) => {
        dispatch({
            type: 'CLEAN_HISTORICAL'
        });
    }
};

// REDUCERS
export const reducer: Reducer<HistoricalState> = (state: HistoricalState, action: KnownAction) => {

    switch (action.type) {
        case 'ADD_SENTENCE':
            let sentences = [...state.sentences, action.sentence];
            let sentenceCategories: Filter[] = action.sentence.categories.map(category => {
                return {
                    value: category,
                    selected: false
                };
            });
            const newCategories = sentenceCategories.filter(category => state.historicalFilter.filter(
                historicalCategory => category.value === historicalCategory.value
            ).length === 0);
            const newFilters = [...state.historicalFilter, ...newCategories];
            const tF = state.historicalFilter.filter(filter => filter.selected);
            const vS = tF.length ? state.sentences.filter(sentence => {
                return sentence.categories
                    .filter(sentenceCat =>
                        toggledFilters.map(filter => filter.value)
                            .indexOf(sentenceCat))
                    .length;
            }) : [...sentences];
            return {
                historicalFilter: newFilters,
                sentences,
                visibleSentences: vS
            };
        case 'TOGGLE_HISTORICAL_FILTER':
            const filters = [...state.historicalFilter];
            filters[action.index].selected = !filters[action.index].selected;
            const toggledFilters = filters.filter(filter => filter.selected);
            const visibleSentences = toggledFilters.length ? state.sentences.filter(sentence => {
                return sentence.categories
                    .filter(sentenceCat => {
                        return toggledFilters.map(filter => filter.value)
                            .indexOf(sentenceCat) !== -1;
                    }
                    ).length === toggledFilters.length;
            }) : [...state.sentences];
            return {
                sentences: state.sentences,
                historicalFilter: filters,
                visibleSentences
            };
        case 'CLEAN_HISTORICAL':
            return {
                sentences: [],
                historicalFilter: [],
                visibleSentences: []
            };
        default:
            return state || { sentences: [], visibleSentences: [], historicalFilter: [] };
    }
};
