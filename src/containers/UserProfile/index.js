import { Grid, Typography, withStyles } from "material-ui";
import FlatButton from "material-ui/Button";
import Card, { CardContent } from "material-ui/Card";
import Chip from "material-ui/Chip";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Helmet from "react-helmet";
import BehanceIcon from "react-icons/lib/fa/behance-square";
import FacebookIcon from "react-icons/lib/fa/facebook-square";
import GithubIcon from "react-icons/lib/fa/github-square";
import InstagramIcon from "react-icons/lib/fa/instagram";
import LinkedInIcon from "react-icons/lib/fa/linkedin-square";
import TwitterIcon from "react-icons/lib/fa/twitter-square";
import { Link } from "react-router-dom";
import { ItemGrid } from "../../components";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import authenticate from "../../utils/Authenticate";
import userProfileStyles from '../../variables/styles/userProfileStyles';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: JSON.parse(localStorage.getItem("user")),
      user: "",
      space: "",
      skills: [],
      token: localStorage.getItem("token"),
      loading: true,
      logo: '',
      companyName: '',
      verticals: [],
    };
  }
  async componentDidMount() {
    let authorized;
    try {
      authorized = await authenticate(localStorage["token"]);
    } finally {
      if (authorized !== undefined) {
        const { error, user } = authorized;
        if (user) {
          this.getUser();
          this.setState({ loading: false });
        } else if (error) {
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        }
      } else {
        localStorage.removeItem("token");
        this.props.history.push("/");
      }
    }
  };
  getUser = () => {
    fetch(`http://localhost:8000/api/user/profile/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${localStorage["token"]}` }
    })
      .then(response => response.json())
      .then(({
        user,
        skills,
        space,
      }) => {
        this.setState(() => ({
          user,
          space,
          skills: skills ? skills : []
        }), () => {
          if (user.companyID) {
            this.getCompany(user.companyID)
          }
        });
      });
  };
  getCompany = companyID => {
    fetch(`http://localhost:8000/api/company/${companyID}`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({
        company,
        verticals,
        error,
      }) => {
        if (company) {
          const {
            logo,
            name: companyName,
          } = company;
          this.setState(() => ({
            logo,
            companyName,
            verticals,
          }));
        }
      });
  };
  renderTag = (skill, i) => {
    const { classes } = this.props;
    return (
      <Chip
        className={classes.chipStyle}
        key={`Chip${i}`}
        label={skill}
        onClick={() => {
        }}
      />
    );
  };
  renderVertical = (vertical, i) => {
    const { classes } = this.props;
    return (
      <Chip
        className={classes.chipStyleTwo}
        key={`verticals${i}`}
        label={vertical.label}
        onClick={() => {
        }}
      />
    );
  };
  isUser = () => (
    this.state.auth && (this.state.auth.id === parseInt(this.props.match.params.id, 10))
  );
  render() {
    const { classes } = this.props;
    const { auth } = this.state;
    const {
      facebook,
      twitter,
      instagram,
      linkedin,
      github,
      behance,
    } = this.state.user;
    return this.state.loading ? (
      <Spinner loading={this.state.loading} />
    ) : (
        <div className={classes.container}>
          <Helmet title={this.state.user.name} meta={[{ name: "description", content: "Description of UserProfile" }]} />
          <Header space={this.props.spaceName} />
          <Grid container direction="column" justify="center">
            <main className={classes.mainProfile}>
              <ItemGrid style={{ width: '100%' }} removePadding item xs={12} sm={12} md={12}>
                <Card className={classes.profileWrapper}>
                  <CardContent>
                    <Grid container justify="center" style={{ width: '100%' }}>
                      <ItemGrid removePadding item xs={12} md={6} sm={12}>
                        <Grid container justify="center" style={{ width: '100%' }}>
                          <ItemGrid item xs={12} md={5} sm={12}>
                            <section style={{ display: 'flex', flexDirection: 'column' }}>
                              <img alt="" src={this.state.user.avatar} className={classes.profileHeaderImg} />
                              <Typography>
                                {this.isUser() ? "my workspace:" : `${this.state.user.name}'s workspace`}
                              </Typography>
                              {this.state.space.logo &&
                                <Link to={"/space/" + this.state.user.spaceID} className={classes.profileSpaceBlock}>
                                  <img style={{ height: 100, width: 100 }} src={this.state.space.logo} alt="" />
                                </Link>
                              }
                            </section>
                          </ItemGrid>
                          <ItemGrid item xs={12} md={6} sm={12}>
                            <section className={classes.profileContact}>
                              <div>
                                <Typography variant="display1" classes={{ display1: classes.display1 }}>
                                  {this.state.user.name}
                                </Typography>
                                {this.state.user.title &&
                                  <Typography gutterBottom variant="title" classes={{ title: classes.headline }}>
                                    {this.state.user.title}
                                  </Typography>
                                }
                                <div className={classes.profileSkillsList}>
                                  {this.state.skills.map((skill, i) =>
                                    this.renderTag(skill, (i + 1))
                                  )}
                                </div>
                                <div className={classes.dashButtonContainer}>
                                  {this.isUser() &&
                                    <FlatButton href={`/memberDash/${this.state.user.id}`} className={classes.dashButton}>
                                      Dashboard
                                    </FlatButton>
                                  }
                                  <div className={classes.profileSocialList}>
                                    {facebook &&
                                      <a href={this.state.user.facebook}>
                                        <FacebookIcon className={classes.profileIconStyle} />
                                      </a>
                                    }
                                    {twitter &&
                                      <a href={this.state.user.twitter}>
                                        <TwitterIcon className={classes.profileIconStyle} />
                                      </a>
                                    }
                                    {instagram &&
                                      <a href={this.state.user.instagram}>
                                        <InstagramIcon className={classes.profileIconStyle} />
                                      </a>
                                    }
                                    {linkedin &&
                                      <a href={this.state.user.linkedin}>
                                        <LinkedInIcon className={classes.profileIconStyle} />
                                      </a>
                                    }
                                    {github &&
                                      <a href={this.state.user.github}>
                                        <GithubIcon className={classes.profileIconStyle} />
                                      </a>
                                    }
                                    {behance &&
                                      <a href={this.state.user.behance}>
                                        <BehanceIcon className={classes.profileIconStyle} />
                                      </a>
                                    }
                                  </div>
                                </div>
                                <section style={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography className={classes.profileHeaderTitle}>
                                      {this.isUser() ? `my` : `${this.state.user.name}'s`}&nbsp;company:
                                    </Typography>
                                    {this.state.logo &&
                                      <Link to="/company" className={classes.profileSpaceBlock}>
                                        <img style={{ height: 100, width: 100 }} src={this.state.logo} alt="" />
                                      </Link>
                                    }

                                  </div>
                                  <div className={classes.profileSkillsListTwo}>
                                    {this.state.verticals.map((vertical, i) =>
                                      this.renderVertical(vertical, (i + 1))
                                    )}
                                  </div>
                                  {(this.isUser() && !this.state.companyName) &&
                                    <FlatButton href={`/memberDash/${this.state.user.id}`}
                                      className={classes.dashButtonTwo}
                                    >
                                      Add&nbsp;company
                                    </FlatButton>
                                  }
                                </section>
                              </div>
                            </section>
                          </ItemGrid>
                        </Grid>
                      </ItemGrid>
                    </Grid>
                  </CardContent>
                </Card>
              </ItemGrid>
            </main>
          </Grid>
        </div >
      );
  }
}
export default withStyles(userProfileStyles)(UserProfile);

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
