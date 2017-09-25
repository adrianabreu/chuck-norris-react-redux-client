import * as React from 'react';
import { Sentence as SentenceDumb } from '../components/Sentence';
import { Filters } from '../components/Filters';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class Sentence extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchFilters();
    }

    handleClick() {
        this.props.fetchSentence();
    }

    render() {
        return (
            <div className="cn-sentence">
                <button onClick={this.handleClick}>{`Get it!`}</button>
                <SentenceDumb sentence={this.props.sentence} />
                <Filters filters={this.props.filters} toggleFilter={this.props.toggleFilter}/>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const { filters, sentence } = state;  
    return {
        filters,
        sentence
    };
  }

export default connect(mapStateToProps, actions)(Sentence);