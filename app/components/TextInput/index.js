/**
*
* TextInput
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class TextInput extends React.PureComponent {
  constructor(props) {
    super(props); 
    this.handleClick=this.handleClick.bind(this); 
    this.state= {isFocused: false}; 
  }
  
  handleClick () {
    this.setState({isFocused: true})
  }  

  render() {

    const isFocused = this.state.isFocused; 

    if (isFocused) { 
      input = <input type="text" style={inputOnClickStyle} />;  
    } else { 
      input = <input type="text" style={inputStyle} />; 
    }
    
    const inputStyle = {
      margin: '2em', 
      padding: '10px', 
      border: 'none', 
      background: '#EEEEEE', 
    }

    const inputOnClickStyle = {
      margin: '2em',
      padding: '10px',
      border: '1px solid blue',
      background: '#EEEEEE', 
    }

    return (
      <div className="inputWrapper"> 
        {input}
      </div>
    );
  }
}

TextInput.contextTypes = {
  router: React.PropTypes.object
};
