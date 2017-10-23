import * as React from 'react';
import * as StoreSentence from '../store/Sentence';

type SentenceProps = StoreSentence.SentenceState;

export class Sentence extends React.Component<SentenceProps, {}> {
    constructor(props: SentenceProps) {
        super(props);
    }

    render() {
        return (
            <div
                className="cn-sentence"
                dangerouslySetInnerHTML={{ __html: this.props.sentence.value }}
            />
        );
    }
}