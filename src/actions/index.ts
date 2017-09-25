import * as constants from '../constants';
import axios from 'axios';

const API_URL = 'http://api.icndb.com/jokes/random';
const FILTERS_URL = 'http://api.icndb.com/categories';

export function fetchFilters() {
    return (dispatch: any) => {
        return axios.get(FILTERS_URL).then(
            response => {
                dispatch(receiveFilters(response));
            },
            error => console.log(error));
    };
}

export function fetchSentence() {
    return (dispatch: any, getState: any) => {
        return axios.get(API_URL).then(
            response => dispatch(receiveSentence(response)),
            error => console.log(error));
    };
}

export function receiveFilters(json: any) {
    return {
        type: constants.RECEIVE_FILTERS,
        filters: json
    };
}

export function receiveSentence(json: any) {
    return {
        type: constants.RECEIVE_SENTENCE,
        sentence: json.data.value.joke
    };
}