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

export interface ClearHistoricalAction {
    type: 'CLEAR_HISTORICAL';
}

export interface ClearHistoricalFilters {
    type: 'CLEAR_HISTORICAL_FILTERS';
}

type KnownAction = AddSentenceAction & ToggleFilterAction & ClearHistoricalAction & ClearHistoricalFilters;

export const actionCreators = {
    toggleFilter: (index: number): AppThunkAction<ToggleFilterAction> => (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_HISTORICAL_FILTER',
            index: index
        });
    },
    clearHistorical: (): AppThunkAction<ClearHistoricalAction> => (dispatch, getState) => {
        dispatch({
            type: 'CLEAR_HISTORICAL'
        });
    },
    clearFilters: (): AppThunkAction<ClearHistoricalFilters> => (dispatch, getState) => {
        dispatch({
            type: 'CLEAR_HISTORICAL_FILTERS'
        });
    }
};

// REDUCERS

function addSentence(state: HistoricalState, action: AddSentenceAction) {
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

    const toggledFilters = state.historicalFilter.filter(filter => filter.selected);

    const visibleSentences = toggledFilters.length ? state.sentences.filter(sentence => {
        return sentence.categories
            .filter(sentenceCat =>
                toggledFilters.map(filter => filter.value)
                    .indexOf(sentenceCat))
            .length;
    }) : [...sentences];

    return {
        historicalFilter: newFilters,
        sentences,
        visibleSentences: visibleSentences
    };
}

function toggleHistoricalFilter(state: HistoricalState, action: KnownAction) {
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
}

function clearHistoricalFilters(state: HistoricalState, action: KnownAction) {
    const untoggledFilters: Filter[] = state.historicalFilter.map(filter => {
        return {
            value: filter.value,
            selected: false
        };
    });
    return {
        sentences: [...state.sentences],
        historicalFilter: untoggledFilters,
        visibleSentences: [...state.sentences]
    };
}

export const reducer: Reducer<HistoricalState> = (state: HistoricalState, action: KnownAction) => {

    switch (action.type) {
        case 'ADD_SENTENCE': return addSentence(state, action);
        case 'TOGGLE_HISTORICAL_FILTER': return toggleHistoricalFilter(state, action);
        case 'CLEAR_HISTORICAL_FILTERS': return clearHistoricalFilters(state, action);
        case 'CLEAR_HISTORICAL':
            return {
                sentences: [],
                historicalFilter: [],
                visibleSentences: []
            };
        default:
            return state || { sentences: [], visibleSentences: [], historicalFilter: [] };
    }
};
