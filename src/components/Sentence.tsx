import * as React from 'react';
import { Filters } from './Filters';
import { SentenceContainerProps as SentenceProps } from '../containers/SentenceContainer';

export class Sentence extends React.Component<SentenceProps, {}> {
    constructor(props: SentenceProps) {
        super(props);
    }

    componentDidMount() {
        this.props.requestFilters();
    }

    render() {
        return (
            <div className="cn-sentence">
                <div className="cn-sentence-header">
                    <button
                        className="btn btn-default cn-sentence-header_button"
                        onClick={() => this.props.requestSentence()}
                    >
                        {`GET IT!`}
                    </button>
                </div>
                <div className="cn-sentence-body">
                    <div
                        className="cn-sentence-body_sentence"
                        dangerouslySetInnerHTML={{ __html: this.props.sentence.value }}
                    />
                    <div className="cn-sentence-body_author">Chuck Norris</div>
                </div>
                <div className="cn-sentence-footer">
                    {<Filters
                        filters={this.props.filters}
                        toggleFilter={this.props.toggleFilter}
                        clearFilters={this.props.clearFilters}
                    />}
                </div>
            </div>
        );
    }
}