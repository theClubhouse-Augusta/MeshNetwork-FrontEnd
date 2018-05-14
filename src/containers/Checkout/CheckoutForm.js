import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";
import FlatButton from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import { FormControl, FormHelperText } from "material-ui/Form";
import IconButton from "material-ui/IconButton";
import Input, { InputAdornment, InputLabel } from "material-ui/Input";
import { ListItemText } from "material-ui/List";
import { MenuItem } from "material-ui/Menu";
import { LinearProgress } from "material-ui/Progress";
import Select from "material-ui/Select";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";
import React from "react";
import Helmet from "react-helmet";
import Recaptcha from 'react-recaptcha';
import { injectStripe } from "react-stripe-elements";
import uuid from "uuid/v4";
import Header from "../../components/Header";
import CardSection from "./CardSection";
import "./style.css";
import "./styleM.css";

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

class CheckoutForm extends React.PureComponent {
  state = {
    customer_idempotency_key: uuid(),
    subscription_idempotency_key: uuid(),
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
    space: "",
    multi: true,
    options: [],
    value: undefined,
    name: "",
    email: "",
    password: "",
    bio: "",
    selectedTags: [],
    loadedTags: [],
    loadedPlans: [],
    avatar: "",
    imagePreviewUrl: "",
    msg: "",
    snack: false,
    focused: false,
    planFocused: false,
    plan: "",
    isLoading: false,
    showPassword: false,
    passwordError: "",
    recaptcha: "",
  };
  componentDidMount() {
    if (this.state.token && this.state.user) {
      this.props.history.push("/user/" + this.state.user.id);
    } else {
      this.getSpace();
      this.loadSkills();
      if (this.props.pubkey) {
        this.loadPlans();
      }
    }
  };
  handleMouseDownPassword = event => {
    event.preventDefault();
  };
  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  getSpace = () => {
    fetch(
      "http://localhost:8000/api/workspace/" + this.props.match.params.id,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          space: json
        });
      });
  };
  loadSkills = () => {
    fetch("http://localhost:8000/api/skills/all", {})
      .then(response => response.json())
      .then(json => {
        this.setState({ loadedTags: json });
      })
      .catch(error => { });
  };
  loadPlans = () => {
    fetch(
      `http://localhost:8000/api/plans/${this.props.match.params.id}`,
      {}
    )
      .then(response => response.json())
      .then(({ plans }) => {
        if (plans) {
          this.setState({ loadedPlans: plans.sort((a, b) => a.amount - b.amount) });
        }
      })
      .catch(error => { });
  };
  selectPlan = (e, selected) => {
    e.preventDefault();
    this.setState({ plan: selected });
  };
  handleRequestClose = () => {
    this.setState({ snack: false, msg: "" });
  };
  showSnack = msg => {
    this.setState({ snack: true, msg: msg });
  };
  handleName = event => {
    this.setState({ name: event.target.value.replace(/\s\s+/g, " ") });
  };
  handleEmail = event => {
    this.setState({ email: event.target.value });
  };
  handlePassword = event => {
    this.setState({ password: event.target.value }, () => {
      if (this.state.password.length < 6) {
        this.setState({
          passwordError: "Password Too Short"
        });
      } else {
        this.setState({
          passwordError: ""
        });
      }
    });
  };
  handleBio = event => {
    this.setState({ bio: event.target.value });
  };
  handleAvatar = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        avatar: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };
  handleSkillTags = event => {
    this.setState({ selectedTags: event.target.value });
  };
  renderAvatarImage = () => {
    if (this.state.avatar !== "") {
      return (
        <img
          alt="avatarpreview"
          src={this.state.imagePreviewUrl}
          className="spaceLogoImagePreview"
        />
      );
    }
  };
  renderAvatarImageText = () => {
    if (
      this.state.imagePreviewUrl === "" ||
      this.state.imagePreviewUrl === undefined ||
      this.state.imagePreviewUrl === null
    ) {
      return (
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
          }}
        >
          Select a profile picture
          <span style={{ fontSize: "0.9rem", marginTop: "5px" }}>
            For Best Size Use: 512 x 512
          </span>
        </span>
      );
    }
  };
  onFocus = () => {
    this.setState(() => ({ focused: true }));
  };
  onBlur = () => {
    this.setState(() => ({ focused: false }));
  };
  onFocusPlan = () => {
    this.setState(() => ({ planFocused: true }));
  };
  onBlurPlan = () => {
    this.setState(() => ({ planFocused: false }));
  };
  storeUser = e => {
    this.setState(() => ({ isLoading: true }));
    e.preventDefault();
    let data = new FormData();
    let {
      name,
      email,
      password,
      bio,
      selectedTags,
      avatar,
      plan,
      customer_idempotency_key,
      subscription_idempotency_key,
      recaptcha,
    } = this.state;
    this.props.stripe.createToken({ name }).then(({ token }) => {
      data.append("name", name.trim());
      if (selectedTags.length) {
        data.append("tags", selectedTags);
      }
      data.append("email", email.trim());
      data.append("password", password.trim());
      data.append("bio", bio);
      data.append("spaceID", this.state.space.id);
      data.append("avatar", avatar);
      if (token.id) {
        data.append("customerToken", token.id);
      }
      data.append("plan", plan);
      data.append("username", name);
      data.append("customer_idempotency_key", customer_idempotency_key);
      data.append("subscription_idempotency_key", subscription_idempotency_key);
      data.append("recaptcha", recaptcha);
      fetch("http://localhost:8000/api/signUp", {
        method: "POST",
        body: data
      })
        .then(response => response.json())
        .then(user => {
          if (user.error) {
            this.showSnack(user.error);
          } else if (user.token) {
            localStorage.setItem("token", user.token);
            fetch("http://localhost:8000/api/user/auth", {
              method: "GET",
              headers: { Authorization: "Bearer " + user.token }
            })
              .then(response => response.json())
              .then(({ user }) => {
                localStorage.setItem("user", JSON.stringify(user));
                this.showSnack(
                  "Welcome to " + this.state.space.name + "!"
                );
                setTimeout(() => {
                  this.props.history.push(`/user/${user.id}`);
                }, 2000);
              });
          }
          this.setState(() => ({ isLoading: false }));
        });
    });
  };
  storeFreeUser = e => {
    this.setState(() => ({ isLoading: true }));
    e.preventDefault();
    let data = new FormData();
    let {
      name,
      email,
      password,
      bio,
      selectedTags,
      avatar, plan,
      recaptcha,
    } = this.state;
    if (plan === "already") {
      plan = "free";
    }
    data.append("name", name.trim());
    if (!!selectedTags.length) {
      data.append("skills", selectedTags);
    }
    data.append("email", email.trim());
    data.append("password", password.trim());
    data.append("bio", bio.trim());
    data.append("spaceID", this.state.space.id);
    data.append("avatar", avatar);
    data.append("plan", plan);
    data.append("username", name);
    data.append("recaptcha", recaptcha);
    fetch("http://localhost:8000/api/signUp", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(({ user, error }) => {
        if (error) {
          this.showSnack(error);
        } else if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user));
          this.showSnack("Welcome to " + this.state.space.name + "!");
          setTimeout(() => {
            this.props.history.push(`/user/${user.id}`);
          }, 2000);
        }
      });
  };
  renderLoading = () => {
    if (this.state.isLoading) {
      return (
        <LinearProgress
          color="secondary"
          style={{
            width: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0"
          }}
        />
      );
    }
  };
  checkPlan = () => {
    if (this.state.plan === "free" || this.state.plan === "already") {
      return this.storeFreeUser
    } else {
      return this.storeUser
    }
  };
  verifyUser = recaptcha => {
    this.setState(() => ({ recaptcha }));
  };
  render() {
    const { loadedTags, plan, loadedPlans } = this.state;
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <Helmet
          title="SpaceSignUp"
          meta={[
            { name: "description", content: "Description of SpaceSignUp" }
          ]}
        />
        <header className="checkoutHeaderContainer">
          {this.renderLoading()}
          <Header
            headerTitle={this.state.space.name}
            space={this.props.spaceName}
          />
          <div className="checkoutHeaderBanner">
            <h2 className="homeHeaderContentTitle">
              Join {this.state.space.name}
            </h2>
            <h3 className="homeHeaderContentSubtitle">
              Find out what all the buzz is about
            </h3>
          </div>
        </header>
        <main className="userSignUpMain">
          <div className="spaceSignUpMain">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <img
                alt=""
                src={this.state.space.logo}
                height="auto"
                width="300px"
              />
            </div>
            <div className="spaceSignUpContainer">
              <TextField
                label="Full Name"
                value={this.state.name}
                onChange={this.handleName}
                margin="normal"
              />
              <TextField
                type="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleEmail}
                margin="normal"
              />
              <FormControl error={this.state.passwordError ? "true" : ""}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.password}
                  onChange={this.handlePassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this.handleClickShowPasssword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                            <Visibility />
                          )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="password-helper-text">
                  {this.state.passwordError}
                </FormHelperText>
              </FormControl>
              {!!loadedTags.length && (
                <FormControl style={{ marginTop: 24 }}>
                  <InputLabel htmlFor="tags-multiple">
                    Skills & Interests
                  </InputLabel>
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
              {this.props.pubkey && (
                <React.Fragment>
                  <label style={{ marginBottom: 12, marginTop: "60px" }}>
                    Select a Plan
                  </label>
                  <FlatButton
                    style={{
                      backgroundColor: "free" === this.state.plan ? "#ff4d58" : "grey",
                      padding: "10px",
                      marginTop: "15px",
                      color: "#FFFFFF",
                      fontWeight: "bold"
                    }}
                    onClick={e => this.selectPlan(e, "free")}
                  >Free tier</FlatButton>
                  <FlatButton
                    style={{
                      backgroundColor:
                        "already" === this.state.plan ? "#ff4d58" : "grey",
                      padding: "10px",
                      marginTop: "15px",
                      color: "#FFFFFF",
                      fontWeight: "bold"
                    }}
                    onClick={e => this.selectPlan(e, "already")}
                  >Already a Member</FlatButton>
                </React.Fragment>
              )}
              {!!loadedPlans.length &&
                loadedPlans.map((plan, key) => {
                  let id = plan.id;
                  let amount = (plan.amount / 100).toFixed(2).toString();
                  return (
                    <FlatButton
                      key={`goo${key}`}
                      style={{
                        backgroundColor:
                          id === this.state.plan ? "#ff4d58" : "grey",
                        padding: "10px",
                        marginTop: "15px",
                        color: "#FFFFFF",
                        fontWeight: "bold"
                      }}
                      onClick={e => this.selectPlan(e, id)}
                    >{plan.name} - {amount}</FlatButton>
                  );
                })
              }
              {plan !== "free" && plan !== "already" && this.props.pubkey ? <CardSection /> : null}
              <div id="foo" className="spaceLogoMainImageRow">
                <label
                  htmlFor="avatar-image"
                  className="spaceLogoMainImageBlock"
                >
                  {this.renderAvatarImageText()}
                  {this.renderAvatarImage()}
                </label>
                <input
                  type="file"
                  onChange={this.handleAvatar}
                  id="avatar-image"
                  style={{ display: "none" }}
                />
              </div>
              <div style={{ margin: '0 auto' }}>
                <Recaptcha
                  sitekey="6LeZkFIUAAAAAA9d-yORuzPry9zwa1NYXlvS30wI"
                  render="explicit"
                  onloadCallback={() => { console.log('gotcha') }}
                  verifyCallback={response => { this.verifyUser(response) }}
                />
              </div>
              <FlatButton
                style={{
                  backgroundColor: "#ff4d58",
                  padding: "10px",
                  marginTop: "15px",
                  color: "#FFFFFF",
                  fontWeight: "bold"
                }}
                onClick={this.checkPlan()}
              >Sign Up</FlatButton>
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
      </form>
    );
  }
}
export default injectStripe(CheckoutForm);
