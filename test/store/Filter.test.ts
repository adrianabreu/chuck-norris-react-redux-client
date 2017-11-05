import { reducer } from '../../src/store/Filter';

describe('Filters reducer', () => {
    it('should return the initial state', () => {
        const state = {
            filters: []
        };
        const action = {
            type: 'NOT_SUPPORTED_ACTION'
        };
        expect(reducer(state, action)).toEqual({
            filters: []
        });
    });

    it('should add filters', () => {
        const state = {
            filters: []
        };
        expect(reducer(state, {
            type: 'RECEIVE_FILTER',
            filters: ['explicit', 'nerdy']
        })).toEqual({
            filters: [{
                value: 'explicit',
                selected: false
            },
            {
                value: 'nerdy',
                selected: false
            }]
        });
    });

    it('should toogle filters', () => {
        const state = {
            filters: [{
                value: 'explicit',
                selected: false
            },
            {
                value: 'nerdy',
                selected: false
            }]
        };
        expect(reducer(state, {
            type: 'TOGGLE_FILTER',
            index: 0
        })).toEqual({
            filters: [{
                value: 'explicit',
                selected: true
            },
            {
                value: 'nerdy',
                selected: false
            }]
        });
    });
});
