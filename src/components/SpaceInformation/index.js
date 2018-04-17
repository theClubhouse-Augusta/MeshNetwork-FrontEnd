/**
 *
 * SpaceInformation
 *
 */

import React from "react";
import { withStyles } from 'material-ui/styles';
import Paper from "material-ui/Paper";
import { TextField } from "material-ui";
import Button from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";
import {
  EditorState,
  ContentState,
  convertToRaw,
  // convertFromRaw,
  convertFromHTML
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import styles from './style';

class SpaceInformation extends React.PureComponent {
  state = {
    token: localStorage.getItem("token"),
    msg: "",
    snack: false,
    id: "",
    name: "",
    email: "",
    website: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    stripe: "",
    pubKey: "",
    facebook: "",
    twitter: "",
    instagram: "",
    logo: "",
    logoPreview: "",
    description: ""
  };

  spaceUpdateAPI = `https://innovationmesh.com/api/workspaces/${this.props.spaceID}`;

  handleRequestClose = () => {
    this.setState({ snack: false, msg: "" });
  };
  showSnack = msg => {
    this.setState({ snack: true, msg: msg });
  };

  componentDidMount() {
    this.getSpaceInfo();
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onEditorChange = editorState => {
    this.setState({ description: editorState });
  };

  handleLogo = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        logo: file,
        logoPreview: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  getSpaceInfo = () => {
    fetch("https://innovationmesh.com/api/workspace/" + this.props.id, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState(
          {
            id: json.id,
            name: json.name,
            email: json.email,
            website: json.website,
            phone_number: json.phone_number,
            address: json.address,
            city: json.city,
            state: json.state,
            zipcode: json.zipcode,
            logo: json.logo,
            description: EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(json.description)
              )
            ),
            facebook: json.facebook,
            twitter: json.twitter,
            instagram: json.instagram,
            stripe: json.stripe,
            pubKey: json.pubKey
          }
        );
      });
  };

  renderLogoPreview = style => {
    if (this.state.logoPreview === "") {
      return <img alt="" src={this.state.logo} className={style} />;
    } else if (this.state.logo !== this.state.logoPreview) {
      return (
        <img alt="" src={this.state.logoPreview} className={style} />
      );
    }
  };

  spaceInfoSubmit = () => {
    let data = new FormData();
    let {
      id,
      name,
      city,
      address,
      state,
      zipcode,
      email,
      website,
      phone_number,
      description,
      facebook,
      twitter,
      instagram,
      stride,
      pubKey,
      logo
    } = this.state;

    data.append("spaceID", id);
    data.append("name", name);
    data.append("city", city);
    data.append("address", address);
    data.append("state", state);
    data.append("zipcode", zipcode);
    data.append("email", email);
    data.append("website", website);
    data.append("phone_number", phone_number);
    data.append(
      "description",
      draftToHtml(convertToRaw(description.getCurrentContent()))
    );
    data.append("facebook", facebook);
    data.append("twitter", twitter);
    data.append("instagram", instagram);
    data.append("logo", logo);
    data.append("stride", stride);
    data.append("pubKey", pubKey);
    data.append("_method", "PATCH");

    fetch(this.spaceUpdateAPI, {
      method: "post",
      body: data,
      headers: { Authorization: "Bearer " + this.state.token }
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          this.showSnack(json.error);
        } else if (json.success) {
          this.showSnack(json.success);
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper>
          <div className={classes.spaceIDashMain}>
            <form className={classes.spaceIDashForm}>
              <div className={classes.spaceIDashInfoMain}>
                <div className={classes.spaceIDashContactInfo}>
                  <div className={classes.spaceFormItem}>
                    <TextField
                      label="Space Name"
                      margin="normal"
                      value={`${this.state.name}`}
                      placeholder={`${this.state.name}`}
                      onChange={this.handleInputChange("name")}
                      className={classes.textField}
                    />
                  </div>

                  <div className={classes.spaceIDashContactDet}>
                    <div className={classes.spaceFormItem}>
                      <TextField
                        label={"Email"}
                        margin="normal"
                        value={`${this.state.email}`}
                        placeholder={`${this.state.email}`}
                        onChange={this.handleInputChange("email")}
                        className={classes.textField}
                      />
                    </div>
                    <div className="spaceFormItem">
                      <TextField
                        label={"Website"}
                        margin="normal"
                        value={`${this.state.website}`}
                        placeholder={`${this.state.website}`}
                        onChange={this.handleInputChange("website")}
                        className={classes.textField}
                      />
                    </div>
                    <div className="spaceFormItem">
                      <TextField
                        label={"Phone"}
                        margin="normal"
                        value={`${this.state.phone_number}`}
                        placeholder={`${this.state.phone_number}`}
                        onChange={this.handleInputChange("phone_number")}
                      />
                    </div>
                  </div>

                  <div className="spaceIDashLocation">
                    <TextField
                      label={"Address"}
                      margin="normal"
                      value={`${this.state.address}`}
                      placeholder={`${this.state.address}`}
                      onChange={this.handleInputChange("address")}
                    />

                    <div className="spaceIDashAdd">
                      <TextField
                        label={"City"}
                        margin="normal"
                        value={`${this.state.city}`}
                        placeholder={`${this.state.city}`}
                        className={classes.textFieldAdd}
                        onChange={this.handleInputChange("city")}
                      />

                      <TextField
                        label={"State"}
                        margin="normal"
                        value={this.state.state}
                        placeholder={this.state.state}
                        className={classes.textFieldState}
                        onChange={this.handleInputChange("state")}
                      />

                      <TextField
                        label={"Zipcode"}
                        margin="normal"
                        value={this.state.zipcode}
                        placeholder={this.state.zipcode}
                        onChange={this.handleInputChange("zipcode")}
                        className={classes.textFieldZip}
                      />
                    </div>
                  </div>

                  <div className="spaceIDashPaymentInfo">
                    <h3> Payment System </h3>
                    <TextField
                      label={"Stripe Private Key"}
                      margin="normal"
                      placeholder={this.state.stripeKey}
                      defaultValue={this.state.stripeKey}
                      onChange={this.handleInputChange("stripeKey")}
                    />
                    <TextField
                      label={"Stripe Public Key"}
                      margin="normal"
                      placeholder={this.state.pubKey}
                      defaultValue={this.state.pubKey}
                      onChange={this.handleInputChange("pubKey")}
                    />
                  </div>
                </div>

                <div className={classes.spaceIDashLogo}>
                  <h3 className={classes.header}> Logo </h3>
                  <div className={classes.spaceIDashLogoPreview}>
                    {this.renderLogoPreview(classes.spaceIDashLogoPreview)}
                  </div>

                  <div>
                    <label className={classes.label}>
                      <Button variant="raised" component="span">
                        Upload
                        <input
                          onChange={this.handleLogo}
                          type="file"
                          accept="image/*"
                          className={classes.hide}
                        /></Button>
                    </label>
                  </div>
                </div>
              </div>

              <div className={classes.spaceIDashSocialForm}>
                <h3 className={classes.header}>Social Media Handles</h3>
                <div className="spaceIDashSocialMedia">
                  <TextField
                    label={"Facebook"}
                    margin="normal"
                    value={this.state.facebook}
                    placeholder={this.state.facebook}
                    onChange={this.handleInputChange("facebook")}
                  />
                  <TextField
                    label={"Twitter"}
                    margin="normal"
                    value={this.state.twitter}
                    placeholder={this.state.twitter}
                    onChange={this.handleInputChange("twitter")}
                  />
                  <TextField
                    label={"Instagram"}
                    margin="normal"
                    value={this.state.instagram}
                    placeholder={this.state.instagram}
                    onChange={this.handleInputChange("instagram")}
                  />
                </div>
              </div>
            </form>

            <div className={classes.spaceIDashDescription}>
              <h3 className={classes.header}>Description</h3>
              <Paper>
                <Editor
                  editorState={this.state.description}
                  onEditorStateChange={this.onEditorChange}
                  editorStyle={{ padding: "0 .5em" }}
                  toolbar={{
                    inline: { inDropdown: true },
                    fontSize: { className: "toolbarHidden" },
                    fontFamily: { className: "toolbarHidden" },
                    textAlign: {
                      inDropdown: true,
                      options: ["left", "center", "right"]
                    },
                    link: { inDropdown: true },
                    remove: { className: "toolbarHidden" },
                    emoji: { className: "toolbarHidden" },
                    history: { className: "toolbarHidden" }
                  }}
                />
              </Paper>
            </div>
            <div className={classes.spaceIDashSubmit}>
              <Button
                variant="raised"
                className={classes.button}
                onClick={this.spaceInfoSubmit}
              >Submit</Button>
            </div>
          </div>
        </Paper>
        <Snackbar
          open={this.state.snack}
          message={this.state.msg}
          autoHideDuration={3000}
          onClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
export default withStyles(styles)(SpaceInformation);