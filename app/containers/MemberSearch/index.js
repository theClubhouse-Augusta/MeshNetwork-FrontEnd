/*
 *
 * MemberSearch
 *
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes, { oneOfType } from 'prop-types';
/* Icons */
import MdPerson from 'react-icons/lib/md/person';
            
/* Components */
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
/* css */
import './style.css';
import './styleM.css';

export default class MemberSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       skills: [],
       results: [],
       query: '',
       redirect: this.props.redirect,
    };
    this.token = localStorage.getItem('token');
    this.checkToken = this.props.checkToken;
  }

  /**
   * If the user is logged in 
   * this.state.loggedIn = true />
   */
  componentWillMount() {
    this.checkToken(this.token, {checkAuth:true});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirect) {
      this.props.history.push('/');
    } else {
      this.loadSkills();
    }
  }

  loadSkills = () => {
    fetch('http://localhost:8000/api/skills', {
      headers: { Authorization: `Bearer ${this.token}` },
    })
    .then(response =>
      response.json()
    )
    .then(json => {
      this.setState({ skills:json });
    })
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  searchQuery = (e) => {
    const reg = /^\S*$/;
    if (reg.exec(e.target.value) !== null) { // true if input has no space
      this.setState({ query: e.target.value });
    }
  }

  // submit form if 'enter' is pressed
  checkKey = (e) => {
    if (e.keyCode === 13 && this.state.query) {
      fetch(`http://localhost:8000/api/search/?query=${encodeURIComponent(this.state.query)}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then(response =>
        response.json())
      .then(json => {
        if (!json.error) {
          this.setState({ results: json });
        } else {
          alert(json.error); // eslint-disable-line
        }
      })
      .catch(error => {
        alert(`error in fetching data from server: ${error}`); // eslint-disable-line
      });
    }
  }

  ShowSearchResults = () => {
    if (this.state.results.error) {
      alert(this.state.results.error)
    } else {
      return (
        <div id="MS-postSearchContainer">
          {/* User Cards */}
          <ul>
            {this.state.results.map((user, index) => 
              <li
                onClick={() => {
                  this.props.history.push(`/UserProfile/${user.id}`);
                }} 
                key={`userAvatar${user.id}`}
              >
                <img 
                  src={user.avatar} 
                  width="100px" 
                  height="100px" 
                  alt="avatar"
                />
                <dl id="MS-userInfo">
                  <div>  
                    <dt>name:</dt>
                    <dd>
                      &nbsp;&nbsp;&nbsp;{user.name}
                    </dd>
                  </div>

                  <div>  
                    <dt>company:</dt>
                    <dd> 
                      &nbsp;&nbsp;&nbsp;{user.company}
                    </dd>
                  </div>

                  <div>  
                    <dt>Email:</dt>
                    <dd>
                      &nbsp;&nbsp;&nbsp;{user.email}
                     </dd>
                  </div>
                </dl>
              </li>
            )}
          </ul>
        </div>
      );
    } 
  }

  tagClick = (e,tag) => {
    e.preventDefault;
    /** 
     * this api endpoint will change
     * and <tag> will be sent as a url
     * parameter
     */
    fetch(`http://localhost:8000/api/search/?tag=${encodeURIComponent(tag)}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    })
    .then(response => 
      response.json()
    )
    .then(json => {
      this.setState({	results: json });            
    })
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  render() {
    const results = this.ShowSearchResults();
    return (
      <div className="MS-Container">
        {this.state.redirect}
        <Helmet title="MemberSearch" meta={[ { name: 'description', content: 'Description of MemberSearch' }]} />

        {/* Header */}
        <Header />

        <main id="MS-main"> 
          <h1> Make Connections </h1>

          {/* Search Form */}
          <div id="MS-SearchForm">
            <MdPerson className="MS-MdIcon" />
            <input 
              onChange={this.searchQuery}
              onKeyDown={(e) => { this.checkKey(e); }}
              type="search" 
              placeholder="Member Search" 
              value={this.state.query}
            />
          </div> 

          <h2> 
            Popular Tags 
          </h2>

          {/* Tag Row 1 */}
          <section id="MS-TagRowOne">
            <div>
              {this.state.skills.map((skill, index) => {
                while (index < 3) {
                  return (
                    <button
                      id="MS-tags" 
                      key={`skill${skill.id}`}
                      onClick={ (e) => { 
                        this.tagClick(e,skill.name)}
                      }
                    >
                      {skill.name}
                    </button>
                  );
                }
              })}
            </div>
          </section>

          {/* Tag Row 2 */}
          <section id="MS-TagRowTwo">
            <div>
              {this.state.skills.map((skill, index) => {
                while (index >= 3) {
                  return (
                    <button
                      id="MS-tags" 
                      key={`skill${skill.id}`}
                      onClick={ (e) => {
                        this.tagClick(e,skill.name)}
                      }
                    >
                      {skill.name}
                    </button>
                  );
                }
              })}
            </div>
          </section>

          {/* Search Results */}
          {results}
        </main>
        <Footer />
      </div>
    );
  }
}
MemberSearch.propTypes = {
  redirect: PropTypes.oneOfType([ 
    PropTypes.object.isRequired,
    PropTypes.string.isRequired,
  ]),
  checkToken: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
