import * as React from 'react';
import { SentenceDumb } from '../components/Sentence';
// import { Filters } from '../components/Filters';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SentenceStore from '../store/Sentence';

type SentenceProps = SentenceStore.SentenceState & typeof SentenceStore.actionCreators;
class Sentence extends React.Component<SentenceProps, any> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // this.props.fetchFilters();
    }

    render() {
        return (
            <div className="cn-sentence">
                <button onClick={this.handleClick}>{`Get it!`}</button>
                <SentenceDumb sentence={this.props.sentence} />
                {/* <Filters filters={this.props.filters} toggleFilter={this.props.toggleFilter}/> */}
            </div>
        );
    }

    private handleClick() {
        this.props.requestSentence();
    }
}

export default connect(
    (state: ApplicationState) => state.sentence,
    SentenceStore.actionCreators
)(Sentence);