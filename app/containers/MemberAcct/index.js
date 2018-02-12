/*
 *
 * MemberAcct
 *
 */

import React from "react";
import Helmet from "react-helmet";
import Snackbar from "material-ui/Snackbar";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/Button";
//import Select from 'react-select';
//import { Creatable } from 'react-select';
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import { ListItemText } from "material-ui/List";

import Header from "../../components/Header";
import Spinner from "../../components/Spinner";

import Logger from "../../utils/Logger";
import authenticate from "../../utils/Authenticate";
import "./style.css";
import "./styleM.css";
import "react-select/dist/react-select.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default class MemberAcct extends React.PureComponent {
  state = {
    token: localStorage.getItem("token"),
    name: "",
    title: "",
    avatar: "",
    avatarPreview: "",
    //email: '',
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    selectedTags: [],
    loadedTags: [],
    //emailError: false,
    passwordError: false,
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    github: "",
    behance: "",
    loading: true,
    msg: "",
    snack: false
  };

  async componentDidMount() {
    const authorized = await authenticate(
      localStorage["token"],
      this.props.history
    );
    if (!authorized.error) {
      this.getUserInfo();
      this.loadSkills();
      this.setState({ loading: false });
    } else {
      this.props.history.push("/");
    }
  }

  // componentDidMount() {
  // }

  loadSkills = () => {
    fetch("https://innovationmesh.com/api/skills/all", {})
      .then(response => response.json())
      .then(json => {
        this.setState({ loadedTags: json });
      })
      .catch(error =>
        Logger(`front-end: CheckoutForm@Loadskills: ${error.message}`)
      );
  };

  handleRequestClose = () => {
    this.setState({ snack: false, msg: "" });
  };
  showSnack = msg => {
    this.setState({ snack: true, msg: msg });
  };

  handleInputChange = name => event => {
    this.setState(
      {
        [name]: event.target.value
      }
      //function() {
      //console.log(this.state);
      //}
    );
  };

  handleSkillTags = event => {
    this.setState({ selectedTags: new Set(event.target.value) });
  };

  handleAvatar = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        avatar: file,
        avatarPreview: reader.result
      });
    };
    reader.readAsDataURL(file);
    console.log(this.state.avatarPreview);
  };

  renderAvatarPreview = () => {
    if (this.state.avatarPreview == "") {
      return (
        <img
          src={this.state.avatar}
          className="acctProfilePicturePreview"
          height="200px"
          width="200px"
        />
      );
    } else this.state.avatar !== this.state.avatarPreview;
    {
      return (
        <img
          src={this.state.avatarPreview}
          className="acctProfilePicturePreview"
          height="200px"
          width="200px"
        />
      );
    }
  };

  confirmPassword = () => {
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
  };

  getUserInfo = () => {
    fetch(`https://innovationmesh.com/api/user/auth`, {
      method: "GET",
      headers: { Authorization: "Bearer " + this.state.token }
    })
      .then(function(response) {
        return response.json();
      })
      .then(
        function(json) {
          this.setState(
            {
              name: json.user.name,
              title: json.user.title,
              avatar: json.user.avatar,
              //email: json.user.email,
              facebook: json.user.facebook,
              twitter: json.user.twitter,
              instagram: json.user.instagram,
              linkedin: json.user.linkedin,
              github: json.user.github,
              behance: json.user.behance,
              selectedTags: json.user.skills.split(",")
            },
            function() {
              console.log(this.state);
            }
          );
        }.bind(this)
      );
  };

  updateUser = e => {
    e.preventDefault();

    let data = new FormData();
    data.append("title", this.state.title);
    data.append("name", this.state.name);
    data.append("avatar", this.state.avatar);
    data.append("facebook", this.state.facebook);
    data.append("twitter", this.state.twitter);
    data.append("instagram", this.state.instagram);
    data.append("linkedin", this.state.linkedin);
    data.append("github", this.state.github);
    data.append("behance", this.state.behance);
    data.append("skills", JSON.stringify(this.state.selectedTags));
    data.append("password", this.state.password);
    data.append("passwordConfirm", this.state.passwordConfirm);

    fetch(`https://innovationmesh.com/api/user/update`, {
      headers: { Authorization: "Bearer " + this.state.token },
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          this.showSnack(json.success);
        } else {
          this.showSnack(json.error);
        }
      })
      .catch(error => {
        this.showSnack(JSON.stringify(error));
      });
  };

  handleSkillTags = event => {
    this.setState({ selectedTags: event.target.value });
  };

  render() {
    const {
      loadedTags,
      name,
      title,
      avatar,
      avatarPreview,
      phoneNumber,
      facebook,
      twitter,
      instagram,
      linkedin,
      github,
      behance
    } = this.state;
    return this.state.loading ? (
      <Spinner loading={this.state.loading} />
    ) : (
      <div className="accountContainer">
        <Helmet
          title="MemberAcct"
          meta={[{ name: "description", content: "Description of MemberAcct" }]}
        />
        <header style={{ background: "#FFFFFF" }}>
          <Header />
          <div className="acctBanner">
            <div className="homeHeaderContentTitle">Update Your Profile</div>
            <div className="homeHeaderContentSubtitle">
              Let everyone know what you&#39;re all about.
            </div>
          </div>
        </header>

        <main>
          <div className="acctBody">
            <div className="acctMainInfo">
              <div className="acctProfileInfo">
                <div className="acctProfileMain">
                  <h3> Profile Information </h3>

                  <TextField
                    label={"Name"}
                    margin="normal"
                    value={name}
                    placeholder={name}
                    onChange={this.handleInputChange("name")}
                  />
                  <TextField
                    label={"Title"}
                    margin="normal"
                    value={title}
                    placeholder={title}
                    onChange={this.handleInputChange("title")}
                  />
                  {/*<TextField
                                        label={'E-mail'}
                                        margin='normal'
                                        value={`${this.state.email}`}
                                        onChange={this.handleInputChange('email')}
                                    />*/}
                </div>

                <div className="acctProfilePicture">
                  {this.renderAvatarPreview()}
                  <div>
                    <label style={{ display: "flex", flexDirection: "column" }}>
                      <FlatButton raised component="span">
                        Upload
                        <input
                          onChange={this.handleAvatar}
                          type="file"
                          style={{ display: "none" }}
                          accept="image/png, image/jpg, image/jpeg"
                        />
                      </FlatButton>
                    </label>
                  </div>
                </div>
              </div>

              <Divider />

              <div className="acctSocialMediaWrapper">
                <h3> Social Media</h3>
                <div className="acctSocialMedia">
                  <TextField
                    label={"Facebook"}
                    margin="normal"
                    value={this.state.facebook}
                    placeholder={facebook}
                    onChange={this.handleInputChange("facebook")}
                  />
                  <TextField
                    label={"Twitter"}
                    margin="normal"
                    value={twitter}
                    placeholder={twitter}
                    onChange={this.handleInputChange("twitter")}
                  />
                  <TextField
                    label={"Instagram"}
                    margin="normal"
                    value={instagram}
                    placeholder={instagram}
                    onChange={this.handleInputChange("instagram")}
                  />
                  <TextField
                    label={"LinkedIn"}
                    margin="normal"
                    value={linkedin}
                    placeholder={linkedin}
                    onChange={this.handleInputChange("linkedin")}
                  />
                  <TextField
                    label={"Github"}
                    margin="normal"
                    value={github}
                    placeholder={github}
                    onChange={this.handleInputChange("github")}
                  />
                  <TextField
                    label={"Behance"}
                    margin="normal"
                    value={behance}
                    placeholder={behance}
                    onChange={this.handleInputChange("behance")}
                  />
                </div>
              </div>
            </div>
            <Divider />

            <div className="acctTagSelection">
              <h3> Skills </h3>

              {!!loadedTags.length && (
                <FormControl style={{ marginTop: 24, minWidth: "50%" }}>
                  <InputLabel htmlFor="tags-select">Relevant Tags</InputLabel>
                  <Select
                    multiple
                    value={this.state.selectedTags}
                    onChange={this.handleSkillTags}
                    input={<Input id="tag-multiple" />}
                    renderValue={selected => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {loadedTags.map((tag, key) => (
                      <MenuItem key={`${key}tag`} value={tag}>
                        <Checkbox
                          checked={this.state.selectedTags.indexOf(tag) > -1}
                        />
                        <ListItemText primary={tag} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>

            <Divider />

            <div className="acctManagement">
              <h3 style={{ margin: "1em 0" }}> Account Management</h3>
              <div className="acctChangePassForm">
                <h4> Change Password</h4>

                <TextField
                  label={"New Password"}
                  margin="normal"
                  type="password"
                  style={{ maxWidth: "300px" }}
                  onChange={this.handleInputChange("password")}
                />

                <TextField
                  label={"Confirm New Password"}
                  margin="normal"
                  type="password"
                  style={{ maxWidth: "300px" }}
                  onChange={this.handleInputChange("passwordConfirm")}
                />
                <FlatButton
                  style={{
                    backgroundColor: "#ff4d58",
                    padding: "10px",
                    marginTop: "15px",
                    color: "#FFFFFF",
                    fontWeight: "bold"
                  }}
                  onClick={this.updateUser}
                >
                  Update User
                </FlatButton>
              </div>
            </div>
          </div>
        </main>

        <footer className="homeFooterContainer">
          Copyright © 2018 theClubhou.se • 540 Telfair Street • Tel: (706)
          723-5782
        </footer>
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
