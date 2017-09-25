import * as React from 'react';

export class Filters extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="btn-group">
                {
                    this.props.filters.map((filter: any, i: number) => {
                        return <button key={filter} onClick={() => this.props.handleClick(i)}>{filter}</button>;
                    })
                }
            </div>
        );
    }
}