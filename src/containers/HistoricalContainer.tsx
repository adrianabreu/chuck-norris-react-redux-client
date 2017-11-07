import * as React from 'react';
import { ApplicationState } from '../store';
import * as HistoricalStore from '../store/Historical';
import { Historical } from '../components/Historical';
import { connect, Dispatch } from 'react-redux';
import * as Redux from 'redux';

type HistoricalActionsCreators = typeof HistoricalStore.actionCreators;

export type HistoricalContainerProps = HistoricalStore.HistoricalState & HistoricalActionsCreators;

class HistoricalContainer extends React.Component<HistoricalContainerProps, {}> {
    render() {
        return (
            <Historical
                sentences={this.props.sentences}
                visibleSentences={this.props.visibleSentences}
                clearHistorical={this.props.clearHistorical}
                historicalFilter={this.props.historicalFilter}
                toggleFilter={this.props.toggleFilter}
                clearFilters={this.props.clearFilters}
            />
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
)(HistoricalContainer as any);