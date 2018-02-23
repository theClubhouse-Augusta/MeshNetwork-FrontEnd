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
  };

  handleEndTime = e => {
    let preEndTime = e.target.value;
    this.setState({ preEndTime: preEndTime }, () => {
      const validEndTime = this.state.preEndTime.length === 5 ? this.props.handleEndTimes(this.state.preEndTime, this.state.date, this.state.position) : false;
      if (validEndTime) this.setState({ endTime: this.state.preEndTime });
    })
  };


  render() {
    const { startTime, endTime, position } = this.state;
    return (
      <div>
        <div style={{display: 'flex'}}>
          <div>
            <div style={{
              display: 'flex', 
              width: 200,
              justifyContent: 'space-around',
            }}>
              <label className="singleDpConStartLabel">start&nbsp;time</label>
              <input 
                type="time" 
                value={startTime}
                onChange={this.handleStartTime}
              />
            </div>
            <div style={{
              display: 'flex', 
              width: 200,
              justifyContent: 'space-around',
            }}>
              <label>end&nbsp;time</label>
              <input 
                type="time" 
                value={endTime}
                onChange={this.handleEndTime}
              />
            </div>
          </div>
          <div 
            onClick={() => {
              this.setState({
                preEndTime: '',
                preStartTime: ''  ,
              }, () => {
                this.props.clearStartTimes(position);
                this.props.clearEndTimes(position);
              });
            }} 
            style={{alignSelf: 'center'}}
            className="fuck"
          >
            x
          </div>
        </div>
      </div>
    );
  }
}