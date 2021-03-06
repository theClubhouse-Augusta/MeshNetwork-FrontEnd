import Chip from "material-ui/Chip";
import Snackbar from "material-ui/Snackbar";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import authenticate from "../../utils/Authenticate";
import "./style.css";
import "./styleM.css";

export default class MemberSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      results: [],
      query: "",
      token: localStorage.getItem("token"),
      msg: "",
      snack: false,
      loading: true
    };
  }

  handleRequestClose = () => {
    this.setState({ snack: false, msg: "" });
  };
  showSnack = msg => {
    this.setState({ snack: true, msg: msg });
  };

  async componentDidMount() {
    let authorized;
    try {
      authorized = await authenticate(localStorage['token'], this.props.history);
    } finally {
      if (authorized !== undefined) {
        const { error, user } = authorized;
        if (user) {
          this.loadSkills();
          this.setState({ loading: false });
        } else if (error) {
          localStorage.removeItem('token');
          this.props.history.push('/signin');
        }
      } else {
        localStorage.removeItem('token');
        this.props.history.push("/signIn");
      }
    }
  }

  loadSkills = () => {
    fetch("http://localhost:8000/api/skills", {
      //headers: { Authorization: `Bearer ${this.token}` },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ skills: json });
      });
  };

  searchQuery = e => {
    this.setState({ query: e.target.value.trim() });
  };

  // submit form if 'enter' is pressed
  checkKey = e => {
    if (e.keyCode === 13 && this.state.query) {
      let data = new FormData();
      data.append("query", this.state.query);

      fetch("http://localhost:8000/api/search/", {
        method: "POST",
        body: data
        //headers: { Authorization: `Bearer ${this.token}` },
      })
        .then(response => response.json())
        .then(json => {
          if (!json.error) {
            this.setState({ results: json });
          } else {
            this.showSnack(json.error);
          }
        });
    }
  };

  tagClick = tag => {
    let data = new FormData();

    data.append("tag", tag);

    fetch("http://localhost:8000/api/search", {
      method: "POST",
      body: data
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          this.showSnack(json.error);
        } else {
          this.setState({ results: json });
        }
      });
  };

  renderTag = (skill, i) => {
    let chipStyle = {
      color: "#FFFFFF",
      margin: "5px",
      borderRadius: "5px",
      background: "#ff4d58"
    };
    return (
      <Chip
        style={chipStyle}
        key={`Chip${i}`}
        label={skill.name}
        onClick={() => {
          this.tagClick(skill.id);
        }}
      />
    );
  };

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
        <div className="memberSearchContainer">
          <Helmet
            title="MemberSearch"
            meta={[
              { name: "description", content: "Description of MemberSearch" }
            ]}
          />

          <header style={{ background: "#FFFFFF", width: "100%" }}>
            <Header space={this.props.spaceName} />
            <section className="memberSearchBanner">
              <h1 className="memberSearchHeaderTitle">
                Connect with People
              </h1>
              <h2 className="memberSearchHeaderSubtitle">
                Discover new and innovative members
              </h2>
            </section>
          </header>

          <main className="memberSearchMain">
            <div className="memberSearchBar">
              <TextField
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  textAlign: "center",
                  marginBottom: "10px",
                  color: "#FFFFFF"
                }}
                label="Member Search"
                value={this.state.query}
                onChange={this.searchQuery}
                onKeyDown={e => {
                  this.checkKey(e);
                }}
              />
            </div>

            <div className="memberSearchByPopularTags">
              <h3 className="memberSearchTagTitle">Popular Skills</h3>
              <div className="memberSearchTagSelect">
                {this.state.skills.map((skill, i) => this.renderTag(skill, i))}
              </div>
            </div>

            <div className="memberSearchResults">
              {this.state.results.map((user, index) => (
                <Link
                  key={`results${index}`}
                  to={"/user/" + user.id}
                  className="memberBlock"
                >
                  <div className="memberBlockImage" style={{ overflow: 'hidden' }}>
                    <img
                      alt=""

                      src={user.avatar}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="memberBlockInfo">
                    <div className="searchBlockTitle">{user.name}</div>
                    <div className="searchBlockDesc">{user.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
          <footer className="pageFooterContainer">
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

MemberSearch.propTypes = {
  history: PropTypes.object.isRequired
};
