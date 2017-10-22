import { Reducer } from 'redux';
import { AppThunkAction } from './';

const API_URL = 'http://api.icndb.com/categories';

// STATE 
export interface Filter {
    value: string;
    selected: boolean;
}

export interface FilterState {
    filters: Filter[];
}

// ACTIONS
interface RequestFilterAction {
    type: 'FETCH_FILTER';
}

interface ReceiveFilterAction {
    type: 'RECEIVE_FILTER';
    filters: string[];
}

interface ToggleFilterAction {
    type: 'TOGGLE_FILTER';
    index: number;
}

interface ClearFiltersAction {
    type: 'CLEAR_FILTERS';
}

type KnownAction = RequestFilterAction | ReceiveFilterAction | ToggleFilterAction | ClearFiltersAction;

// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
export const actionCreators = {
    requestFilters: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        fetch(API_URL)
            .then(response => response.json())
            .then((response: any) =>
                dispatch(
                    {
                        type: 'RECEIVE_FILTER',
                        filters: response.value
                    }));
    },
    toggleFilter: (index: number): AppThunkAction<ToggleFilterAction> => (dispatch, getState) => {
        dispatch({
            type: 'TOGGLE_FILTER',
            index: index
        });
    },
    clearFilters: (): AppThunkAction<ClearFiltersAction> => (dispatch, getState) => {
        dispatch({
            type: 'CLEAR_FILTERS'
        });
    }
};

// REDUCERS
export const reducer: Reducer<FilterState> = (state: FilterState, action: KnownAction) => {

    switch (action.type) {
        case 'RECEIVE_FILTER':
            const transformedFilters: Filter[] = action.filters.map(filter => {
                return {
                    value: filter,
                    selected: false
                };
            });
            return {
                filters: transformedFilters
            };
        case 'TOGGLE_FILTER':
            let filters = [...state.filters];
            filters[action.index].selected = !filters[action.index].selected;
            return {
                filters
            };
        case 'CLEAR_FILTERS':
            const untoggledFilters: Filter[] = state.filters.map(filter => {
                return {
                    value: filter.value,
                    selected: false
                };
            });
            return {
                filters: untoggledFilters
            };
        default:
            return state || { filters: [] };
    }
};
