import * as React from 'react';
import { SentenceDumb } from '../components/Sentence';
import { Filters } from '../components/Filters';
import { connect, Dispatch } from 'react-redux';
import { ApplicationState } from '../store';
import * as Redux from 'redux';
import * as SentenceStore from '../store/Sentence';
import * as FilterStore from '../store/Filter';

type SentenceActionsCreators = typeof SentenceStore.actionCreators &
    typeof FilterStore.actionCreators;

type SentenceProps = SentenceStore.SentenceState &
    FilterStore.FilterState & SentenceActionsCreators;

class Sentence extends React.Component<SentenceProps, {}> {
    componentDidMount() {
        this.props.requestFilters();
    }

    render() {
        return (
            <div className="cn-sentence">
                <button onClick={() => this.props.requestSentence()}>{`Get it!`}</button>
                {<SentenceDumb sentence={this.props.sentence} />}
                {<Filters filters={this.props.filters} toggleFilter={this.props.toggleFilter} />}
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
)(Sentence);