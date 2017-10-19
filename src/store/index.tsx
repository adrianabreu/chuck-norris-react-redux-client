/*
    {
        sentence: string;
        filters: [{
            value: string,
            toggled: boolean
        }];
        visibleHisotrical: string[];
        historical: string[];
        historicalFilter: [{value: string,
                            activated: boolean
                        }];
    }
*/

// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from '../reducers';

// export function configureStore(preloadedState: any) {
//     return createStore(
//         rootReducer,
//         preloadedState,
//         applyMiddleware(
//             thunkMiddleware
//         )
//     );
// }

import * as Sentence from './Sentence';

// The top-level state object
export interface ApplicationState {
    sentence: Sentence.SentenceState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    sentence: Sentence.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
