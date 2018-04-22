import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
class DateRangePicker extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <form onSubmit={e => e.preventDefault()} autoComplete="off">
          <FormControl className={this.props.classes.formControl}>
            <InputLabel htmlFor="month-helper">Month</InputLabel>
            <Select
              value={this.props.month}
              error={this.props.error}
              onChange={this.props.selectMonth}
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
          </FormControl>
        </form>

        <TextField
          style={{ width: 120, marginTop: 24 }}
          error={this.props.error}
          id="number"
          placeholder="Year"
          value={this.props.year}
          onChange={this.props.selectYear}
          type="text"
          className={this.props.classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />

      </div>
    );
  }
}
DateRangePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateRangePicker);