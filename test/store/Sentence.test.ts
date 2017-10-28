import { reducer } from '../../src/store/Sentence';

describe('Sentence reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            sentence: ''
        });
    });

    it('should add a new sentence', () => {
        expect(reducer({}, { type: 'RECEIVE_SENTENCE', sentence: 'Test' })).toEqual({
            sentence: 'Test'
        });
    });
});