
/*
 *
 * AllAppearances
 *
 */
import React from 'react';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

import './style.css';
import './styleM.css';

export class AllAppearances extends React.PureComponent {
    state = {
        data: [],
    };

    componentDidMount() {
        this.loadAppearances();
    }

    loadAppearances = () => {
        fetch(`https://innovationmesh.com/api/appearances/${this.props.match.params.id}`, {
        })
            .then(response => response.json())
            .then(json => this.setState({ data: json }))
            .catch(error => {  });
    }

    render() {
        const { data } = this.state;

        return (
            !!data.length ?
                <AreaChart width={600} height={400} data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                        type='monotone'
                        dataKey='check-ins'
                        stroke='#87b079'
                        fill='#87b079'
                    />
                </AreaChart>
                :
                <h2 className="spaceDashDataTitleGraphz"> No data for check-ins</h2>
        );
    }
}
