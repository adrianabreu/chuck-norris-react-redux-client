import * as React from 'react';
import { Sentence } from '../components/Sentence';
import { connect, Dispatch } from 'react-redux';
import * as Redux from 'redux';
import { ApplicationState } from '../store';
import * as SentenceStore from '../store/Sentence';
import * as FilterStore from '../store/Filter';

type SentenceActionsCreators = typeof SentenceStore.actionCreators &
    typeof FilterStore.actionCreators;

export type SentenceContainerProps = SentenceStore.SentenceState &
    FilterStore.FilterState & SentenceActionsCreators;

class SentenceContainer extends React.Component<SentenceContainerProps, {}> {
    render() {
        return (
            <div className="cn-sentence">
                {
                    <Sentence
                        sentence={this.props.sentence}
                        requestSentence={this.props.requestSentence}
                        filters={this.props.filters}
                        toggleFilter={this.props.toggleFilter}
                        clearFilters={this.props.clearFilters}
                        requestFilters={this.props.requestFilters}
                    />
                }
            </div>
        );
    }

}

function mapStateToProps(state: ApplicationState) {
    return { sentence: state.sentence.sentence, filters: state.filters.filters };
}

function mapDispatchToProps(dispatch: Dispatch<SentenceActionsCreators>) {
    const boundActionCreators = Redux.bindActionCreators(
        {
            ...SentenceStore.actionCreators,
            ...FilterStore.actionCreators
        },
        dispatch);
    return boundActionCreators;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SentenceContainer);