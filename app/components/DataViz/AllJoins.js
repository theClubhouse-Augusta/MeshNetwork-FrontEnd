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

export class AllJoins extends React.PureComponent {
    state = {
        data: [],
    };

    componentDidMount() {
        this.loadJoins();
    }

    loadJoins = () => {
        fetch(`https://innovationmesh.com/api/joins/${this.props.match.params.id}`, {
        })
            .then(response => response.json())
            .then(json => this.setState({ data: json }))
            .catch(error => {  } );
    }

    render() {
        const { data } = this.state;

        return (
            <AreaChart
                width={600}
                height={400}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type='monotone'
                    dataKey='joins'
                    stroke='#1284d8'
                    fill='#1284d8'
                />
            </AreaChart>
        );
    }
}
