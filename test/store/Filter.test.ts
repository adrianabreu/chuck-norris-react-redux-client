import { reducer } from '../../src/store/Filter';

describe('Filters reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            filters: []
        });
    });

    it('should add filters', () => {
        expect(reducer(undefined, {})).toEqual({
            filters: []
        });
    });

    it('should toogle filters', () => {
        expect(reducer(undefined, {})).toEqual({
            filters: []
        });
    });
});
