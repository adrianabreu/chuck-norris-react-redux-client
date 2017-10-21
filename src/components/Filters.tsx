import * as React from 'react';
import * as FilterStore from '.././store/Filter';

type FilterDispatchProps = {
    toggleFilter: (index: number) => void
};

type FilterProps = FilterStore.FilterState & FilterDispatchProps;

export class Filters extends React.Component<FilterProps, {}> {
    constructor(props: FilterProps) {
        super(props);
    }

    render() {
        return (
            <div className="btn-group">
                {
                    this.props.filters.map((filter: FilterStore.Filter, i: number) => {
                        return <button key={filter.value} onClick={() => this.props.toggleFilter(i)}>
                            {filter.value}
                        </button>;
                    })
                }
            </div>
        );
    }
}