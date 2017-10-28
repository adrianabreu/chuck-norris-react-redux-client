import * as React from 'react';
import { Filters } from '../components/Filters';
import { HistoricalContainerProps as HistoricalProps } from '../containers/HistoricalContainer';

export class Historical extends React.Component<HistoricalProps, {}> {
    render() {
        return (
            <div className="cn-historical">
                <div className="cn-historical-header">
                    Historical
                    <button
                        className="cn-historical-header_button btn btn-default"
                        onClick={() => this.props.clearHistorical()}
                    >
                        clear history
                    </button>
                </div>
                <div className="cn-historical-body">
                    {
                        this.props.visibleSentences.map((sentence) =>
                            <div
                                key={sentence.value}
                                className="cn-historical-body_sentence"
                                dangerouslySetInnerHTML={{ __html: sentence.value }}
                            />
                        )
                    }
                </div>
                <div className="cn-historical-footer">
                    {<Filters
                        filters={this.props.historicalFilter}
                        toggleFilter={this.props.toggleFilter}
                        clearFilters={this.props.clearFilters}
                    />}
                </div>
            </div>
        );
    }

}