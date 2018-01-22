/*
 *
 * AppearanceByMonthYear
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import FlatButton from 'material-ui/Button';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar
} from 'Recharts';

import DateRangePicker from '../DateRangePicker';
import Logger from '../../utils/Logger';

import './style.css';
import './styleM.css';

export class AppearanceByMonthYear extends React.PureComponent {
    state = {
        dataTwo: '',
        month: '',
        year: '',
        month2: '',
        year2: '',
        error: false
    };

    loadAppearancesForMonthYear = () => {
        const { year, year2, month, month2 } = this.state;
        if (year && year2 && month && month2) {
            fetch(`https://innovationmesh.com/api/appearances/range/${this.props.match.params.id}/${month}/${year}/${month2}/${year2}`, {
            })
                .then(response => response.json())
                .then(json => this.setState({
                    dataTwo: json,
                    error: false
                }))
                .catch(error => Logger(`front-end: AppearanceByMonthYear@AppearancesForMonthYear: ${error.message}`));
        } else {
            this.setState({ error: true })
        }
    }

    selectMonth = event => {
        this.setState({ month: event.target.value });
    };

    selectMonth2 = event => {
        this.setState({ month2: event.target.value });
    };

    selectYear = e => {
        if (e.target.value.match(/^\d*$/))
            this.setState({ year: e.target.value });
    }

    selectYear2 = e => {
        if (e.target.value.match(/^\d*$/))
            this.setState({ year2: e.target.value });
    }


    render() {
        const { error, month, year, dataTwo, month2, year2 } = this.state;

        return (
            <div style={{ display: 'flex' }}>
                <Helmet title="DataViz" meta={[{ name: 'description', content: 'Description of DataViz' }]} />
                <section style={{ marginRight: 36 }}>
                    <h3>From</h3>
                    <DateRangePicker
                        year={year}
                        month={month}
                        selectMonth={this.selectMonth}
                        selectYear={this.selectYear}
                        error={error}
                    />
                    <h3 style={{ marginTop: 16 }}>To</h3>
                    <DateRangePicker
                        year={year2}
                        month={month2}
                        selectMonth={this.selectMonth2}
                        selectYear={this.selectYear2}
                        error={error}
                    />

                    <FlatButton
                        style={{
                            backgroundColor: '#3399cc',
                            padding: '10px',
                            marginTop: '15px',
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            width: 240,
                            margin: 12
                        }}
                        onClick={this.loadAppearancesForMonthYear}
                    >
                        Sumbit
          </FlatButton>
                </section>
                <section>
                    {dataTwo &&
                        <BarChart width={730} height={300} data={dataTwo}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="check-ins" fill="#8884d8" />
                        </BarChart>}
                </section>
            </div>
        );
    }
}
