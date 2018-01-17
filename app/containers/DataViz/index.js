/*
 *
 * DataViz
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'Recharts';

import './style.css';
import './styleM.css';

export default class DataViz extends React.PureComponent {
  state = {
    data: '',
    selectedMonth: '',
  };

  componentDidMount() {
    this.loadAppearances();
  }

  loadAppearances = () => {
    fetch(`http://innovationmesh.com/api/appearances/${this.props.match.params.id}`, {
    })
    .then(response => response.json())
    .then(json => this.setState({ data:json }))
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  selectMonth = selected => {
    this.setState({ selectedMonth: selected });
  }

  render() {
    const { data, selectedMonth } = this.state;
    const options = [
      {text: 'Jan', value: 'Jan'},
      {text: 'Feb', value: 'Feb'}
    ];

    return (
      <div className="container">
        <Helmet title="DataViz" meta={[ { name: 'description', content: 'Description of DataViz' }]} />
        {data &&
        <LineChart
          width={800}
          height={700}
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="appearances" stroke="#8884d8" activeDot={{r: 8}}/>
        </LineChart>}
        <SimpleSelectFoo />
      </div>
    );
  }
}


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

// @withStyles(styles)
class SimpleSelect extends React.Component {
    state = {
      month: '',
      year: '',
    };

    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    render() {
      const { classes } = this.props;
      const { year, month } = this.state;

      return (
        <form onSubmit={e => e.preventDefault()} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="month-helper">Month</InputLabel>
            <Select
              value={month}
              onChange={this.handleChange}
              input={<Input name="month" id="month-helper" />}
            >
              <MenuItem value={1}>Jan</MenuItem>
              <MenuItem value={2}>Feb</MenuItem>
              <MenuItem value={3}>Mar</MenuItem>
              <MenuItem value={4}>Apr</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>Jun</MenuItem>
              <MenuItem value={7}>Jul</MenuItem>
              <MenuItem value={8}>Aug</MenuItem>
              <MenuItem value={9}>Sept</MenuItem>
              <MenuItem value={10}>Oct</MenuItem>
              <MenuItem value={11}>Nov</MenuItem>
              <MenuItem value={12}>Dec</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="year-input">Year</InputLabel>
            <Input
              onChange={this.handleChange}
              name="year"
              id="year-input"
              value={year}
            />
            <FormHelperText>Select a year</FormHelperText>
          </FormControl>

        </form>
      );
    }
  }

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleSelectFoo = withStyles(styles)(SimpleSelect);
