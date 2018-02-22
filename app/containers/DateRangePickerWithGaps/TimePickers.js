import React, { PureComponent } from 'react';

export default class TimerPickers extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startTime: props.startTime  ? props.startTime : [],
      endTime: props.endTime  ? props.endTime : [],
      position: props.position,
    };
  }

  handleStartTime = e => {
    let startTime = e.target.value;
    this.props.handleStartTimes(startTime);
    this.setState(() => ({ startTime }));
  };

  handleEndTime = e => {
    let endTime = e.target.value;
    this.props.handleEndTimes(endTime);
    this.setState(() => ({ endTime }));
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
          />
        </div>
      </div>
    );
  }
}