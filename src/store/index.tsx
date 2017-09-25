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

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

export function configureStore(preloadedState: any) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}