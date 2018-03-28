import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from "./RaisedButton";

export default class NewSponsorForm extends React.Component {

  state = {
    logo: "",
    logoPreview: "",
  };

  renderLogoImage = () => {
    if (this.state.logo !== "") {
      return (
        <img alt="" src={this.state.logoPreview} className="spaceLogoImagePreview" />
      );
    }
  };

  renderLogoImageText = () => {
    if (this.state.logoPreview === "" || this.state.logoPreview === undefined || this.state.logoPreview === null) {
      return (
        <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          Select a Logo
          <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>For Best Size Use: 512 x 512</span>
        </span>
      )
    }
  };

  render() {
    return (
      <div
        className="spaceSignUpContainer"
        onSubmit={this.props.onFormSubmit}>
        <TextField
          label="name"
          //onChange={this.eventName} 
          type="text"
          name="eventName"
          margin="normal"
        //style={{width: '100%', marginTop: 10, height: '35px', border: '1px solid black'}} 
        />

        <TextField
          label="website"
          error
          //onChange={this.eventName} 
          type="url"
          name="eventName"
          margin="normal"
        //style={{width: '100%', marginTop: 10, height: '35px', border: '1px solid black'}} 
        />

        <div className="spaceLogoMainImageRow">

          <label htmlFor="logo-image" className="spaceLogoMainImageBlock">
            {this.renderLogoImageText()}
            {this.renderLogoImage()}
          </label>

          <input
            type="file"
            onChange={this.handleLogo}
            id="logo-image"
            style={{ display: 'none' }}
            accept="image/png, image/jpg, image/jpeg"
          />

        </div>

        <button><RaisedButton /></button>
      </div>
    );
  }
}
