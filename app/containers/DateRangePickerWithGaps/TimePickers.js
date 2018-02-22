import React, { Component } from 'react';
// import moment from 'moment';

export default class TimerPickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preStartTime: '',
      preEndTime: '',
      startTime: props.startTime  ? props.startTime : '',
      endTime: props.endTime  ? props.endTime : '',
      position: props.position,
      date: !!props.date ? props.date.format('YYYY-MM-DD') : '',
      validStartTime: true,
      validEndTime: true,
    };
  }

  handleStartTime = e => {
    let preStartTime = e.target.value;
    this.setState({ preStartTime: preStartTime }, () => {
      const validStartTime = this.state.preStartTime.length === 5 ? this.props.handleStartTimes(this.state.preStartTime, this.state.date, this.state.position) : false;
      if (validStartTime) this.setState({ startTime: this.state.preStartTime });
    })
    // const { validStartTime } = this.state;
    // if (validStartTime) this.setState(() => ({ startTime }));
    // else this.setState(() => ({ startTime: '' }))
  };

  handleEndTime = e => {
    let preEndTime = e.target.value;
    this.setState({ preEndTime: preEndTime }, () => {
      const validEndTime = this.state.preEndTime.length === 5 ? this.props.handleEndTimes(this.state.preEndTime, this.state.date, this.state.position) : false;
      if (validEndTime) this.setState({ endTime: this.state.preEndTime });
    })
    // let endTime = e.target.value;
    // // const { validEndTime } = this.state;
    // const validEndTime = e.target.value.length === 5 ? this.props.handleEndTimes(endTime, this.state.date, this.state.position) : false;
    // if (validEndTime) this.setState(() => ({ endTime }));
    // // else this.setState(() => ({ endTime: '' }))
  };

  handleValidEndtimes = () => {
    let {
      endTime,
      date,
      position,
      validEndTime,
    } = this.state;
    validEndTime = (endTime && date && position !== undefined) ? this.props.handleEndTimes(endTime, date, position) : false;
    this.setState(() => ({ validEndTime }));
  };
  handleValidStartTimes = () => {
    let {
      startTime,
      date,
      position,
      validStartTime,
    } = this.state;
    validStartTime = (startTime && date && position !== undefined) ? this.props.handleStartTimes(startTime, date, position) : false;
    this.setState(() => ({ validStartTime }));
  };

  render() {
    return (
      <div>
        <div style={{
          display: 'flex', 
          width: 200,
          justifyContent: 'space-between',
        }}>
          <label className="singleDpConStartLabel">start&nbsp;time</label>
          <input 
            type="time" 
            value={this.state.startTime}
            onChange={this.handleStartTime}
//            onBlur={this.handleValidStartTimes}
          />
        </div>

        <div style={{
          display: 'flex', 
          width: 200,
          justifyContent: 'space-between',
        }}>
          <label>end&nbsp;time</label>
          <input 
            type="time" 
            value={this.state.endTime}
            onChange={this.handleEndTime}
//            onBlur={this.handleValidEndTimes}
          />
        </div>
      </div>
    );
  }
}