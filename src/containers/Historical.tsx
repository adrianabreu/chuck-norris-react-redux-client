import * as React from 'react';
import { ApplicationState } from '../store';
import * as HistoricalStore from '../store/Historical';
import { Filters } from '../components/Filters';
import { connect, Dispatch } from 'react-redux';
import * as Redux from 'redux';

type HistoricalActionsCreators = typeof HistoricalStore.actionCreators;

type HistoricalProps = HistoricalStore.HistoricalState & HistoricalActionsCreators;

class Historical extends React.Component<HistoricalProps, {}> {
    render() {
        return (
            <div className="cn-historical">
                <div className="cn-historical-header">
                    Historical <button onClick={() => this.props.cleanHistorical()}>Clean</button>
                </div>
                <div className="cn-historical-body">
                    {
                        this.props.visibleSentences.map((sentence) =>
                            <div key={sentence.value} className="cn-historical-body_sentence">
                                {sentence.value}
                            </div>
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

function mapStateToProps(state: ApplicationState) {
    return {
        sentences: state.sentences.sentences,
        historicalFilter: state.sentences.historicalFilter,
        visibleSentences: state.sentences.visibleSentences
    };
}

function mapDispatchToProps(dispatch: Dispatch<HistoricalActionsCreators>) {
    const boundActionCreators = Redux.bindActionCreators(
        {
            ...HistoricalStore.actionCreators
        },
        dispatch);
    return boundActionCreators;
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Historical);