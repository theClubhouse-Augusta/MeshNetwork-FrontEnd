
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
} from 'Recharts';
import Logger from '../../utils/Logger';

import './style.css';
import './styleM.css';

export class AllAppearances extends React.PureComponent {
    state = {
        data: '',
    };

    componentDidMount() {
        this.loadAppearances();
    }

    loadAppearances = () => {
        fetch(`http://localhost:8000/api/appearances/${this.props.match.params.id}`, {
        })
            .then(response => response.json())
            .then(json => this.setState({ data: json }))
            .catch(error => Logger(`front-end: Allappearances@loadAppearances: ${error.message}`));
    }

    render() {
        const { data } = this.state;

        return (
            <AreaChart width={600} height={400} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type='monotone' dataKey='check-ins' stroke='#8884d8' fill='#8884d8' />
            </AreaChart>
        );
    }
}
