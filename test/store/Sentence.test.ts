import { reducer } from '../../src/store/Sentence';

describe('Sentence reducer', () => {
    it('should return the initial state', () => {
        expect(reducer({
            sentence: {
                value: '',
                categories: []
            }
        },
            // tslint:disable-next-line:align
            {
                type: 'NOT_SUPPORTED_ACTION'
            }
        )
        ).toEqual({
            sentence: {
                value: '',
                categories: []
            }
        });
    });

    it('should add a new sentence', () => {
        expect(reducer({
            sentence: {
                value: '',
                categories: []
            }
        },
            // tslint:disable-next-line:align
            { type: 'RECEIVE_SENTENCE', sentence: { value: 'Test', categories: [] } }
        )).toEqual({
            sentence: { value: 'Test', categories: [] }
        });
    });
});