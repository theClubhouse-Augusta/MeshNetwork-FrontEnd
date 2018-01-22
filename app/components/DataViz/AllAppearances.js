
/*
 *
 * AllAppearances
 *
 */
import React from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
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
        fetch(`https://innovationmesh.com/api/appearances/${this.props.match.params.id}`, {
        })
            .then(response => response.json())
            .then(json => this.setState({ data: json }))
            .catch(error => Logger(`front-end: Allappearances@loadAppearances: ${error.message}`));
    }

    render() {
        const { data } = this.state;

        return (
            <div className="container">
                {data &&
                    <LineChart
                        width={this.props.width ? this.props.width : 800}
                        height={this.props.height ? this.props.height : 800}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="appearances" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>}
            </div>
        );
    }
}
