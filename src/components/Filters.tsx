import * as React from 'react';
import * as FilterStore from '.././store/Filter';

type FilterDispatchProps = {
    toggleFilter: (index: number) => void,
    clearFilters: () => void
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
                        return <button
                            className={`btn ${filter.selected ? 'btn--active' : ''}`}
                            key={filter.value}
                            onClick={() => this.props.toggleFilter(i)}
                        >
                            {filter.value}
                        </button>;
                    })
                }
                <button
                    className={`btn btn-secondary`}
                    onClick={() => this.props.clearFilters()}
                >
                    clear filters
                </button>
            </div>
        );
    }
}