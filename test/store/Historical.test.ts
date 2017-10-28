import { reducer } from '../../src/store/Historical';

describe('Historical reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            sentences: [],
            visibleSentences: [],
            historicalFilter: []
        });
    });

    it('should add a sentence', () => {
        const state = {
            sentences: [],
            visibleSentences: [],
            historicalFilter: []
        };
        expect(reducer(state, {
            type: 'ADD_SENTENCE', sentence: {
                value: 'Chuck made this test pass',
                categories: []
            }
        })).toEqual({
            sentences: [{ value: 'Chuck made this test pass', categories: [] }],
            visibleSentences: [{ value: 'Chuck made this test pass', categories: [] }],
            historicalFilter: []
        });
    });

    it('should add filters to the historical', () => {
        const state = {
            sentences: [],
            visibleSentences: [],
            historicalFilter: []
        };
        expect(reducer(state, {
            type: 'ADD_SENTENCE', sentence: {
                value: 'Chuck made this test pass',
                categories: ['explicit']
            }
        })).toEqual({
            sentences: [{ value: 'Chuck made this test pass', categories: ['explicit'] }],
            visibleSentences: [{ value: 'Chuck made this test pass', categories: ['explicit'] }],
            historicalFilter: [{ value: 'explicit', selected: false }]
        });
    });

    it('shouldnt add the same filters twice to the historical', () => {
        const state = {
            sentences: [{ value: 'Chuck made this test pass', categories: ['explicit'] }],
            visibleSentences: [{ value: 'Chuck made this test pass', categories: ['explicit'] }],
            historicalFilter: [{ value: 'explicit', selected: false }]
        };
        expect(reducer(state, {
            type: 'ADD_SENTENCE', sentence: {
                value: 'My filter should not be added',
                categories: ['explicit']
            }
        })).toEqual({
            sentences: [{ value: 'Chuck made this test pass', categories: ['explicit'] }, {
                value: 'My filter should not be added',
                categories: ['explicit']
            }],
            visibleSentences: [{ value: 'Chuck made this test pass', categories: ['explicit'] },
            {
                value: 'My filter should not be added',
                categories: ['explicit']
            }],
            historicalFilter: [{ value: 'explicit', selected: false }]
        });
    });


    it('should filter the visible sentences on  historical', () => {
        const state = {
            sentences: [
                { value: 'Chuck made this test pass', categories: ['explicit'] },
                { value: 'This should not appear on filtered results', categories: [] }
            ],
            visibleSentences: [
                { value: 'Chuck made this test pass', categories: ['explicit'] },
                { value: 'This should not appear on filtered results', categories: [] }
            ],
            historicalFilter: [{ value: 'explicit', selected: false }]
        };
        expect(reducer(state, { type: 'TOGGLE_HISTORICAL_FILTER', index: 0 })).toEqual({
            sentences: [
                { value: 'Chuck made this test pass', categories: ['explicit'] },
                { value: 'This should not appear on filtered results', categories: [] }
            ],
            visibleSentences: [
                { value: 'Chuck made this test pass', categories: ['explicit'] }
            ],
            historicalFilter: [{ value: 'explicit', selected: true }]
        });
    });


    it('should clear the historical', () => {
        const state = {
            sentences: [{ value: 'Chuck said...', categories: [] }],
            visibleSentences: [{ value: 'Chuck said...', categories: [] }],
            historicalFilter: []
        };
        expect(reducer(state, { type: 'CLEAR_HISTORICAL' })).toEqual({
            sentences: [],
            visibleSentences: [],
            historicalFilter: []
        });
    });


});