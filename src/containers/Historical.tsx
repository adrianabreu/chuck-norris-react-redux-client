import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { HistoricalState } from '../store/Historical';

type HistoricalProps = HistoricalState;

class Historical extends React.Component<HistoricalProps, {}> {
    render() {
        return (
            <div className="cn-historical">
                <div className="cn-historical-header">
                    Historical
                </div>
                <div className="cn-historical-body">
                    {
                        this.props.sentences.map((sentence) =>
                            <div key={sentence.value} className="cn-historical-body_sentence">
                                {sentence.value}
                            </div>
                        )
                    }
                </div>
                <div className="cn-historical-footer" />
            </div>
        );
    }

}

function mapStateToProps(state: ApplicationState) {
    console.log(state);
    return { sentences: state.sentences.sentences };
}

export default connect(
    mapStateToProps
)(Historical);