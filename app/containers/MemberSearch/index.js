/*
 *
 * MemberSearch
 *
 */
import React from 'react';
/* Components */
import Helmet from 'react-helmet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
/* Icons */
import MdPerson from 'react-icons/lib/md/person';
/* css */
import './style.css';
import './styleM.css';

export default class MemberSearch extends React.PureComponent {
  constructor() {
    super();
    this.state = {
       skills: [],
       results: [],
       postSearch: false,
    };
  }

  componentDidMount() {
    this.loadSkills();
  }

  loadSkills = () => {
    fetch('http://localhost:8000/api/skills'
    ).then(response =>
      response.json()
    ).then(json => {
      this.setState({ skills:json });
    })
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  goBack = (e) => {
    e.preventDefault;
    this.setState({	postSearch: !this.state.postSearch });
  }

  Show = () => {
    if (!this.state.postSearch) {
      return '';
    } else {
      return (
        <div id="MS-postSearchContainer">
        {/* Go back button and header */}
          <section>
            <button onClick={this.goBack}>
              Back to Search
            </button>
            <h2> Results </h2> 
          </section> 

          {/* User Cards */}
          <ul>
            {this.state.results.map((user, index) => 
              <li key={`userAvatar${user.id}`}>
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
                    <dt>Skills:</dt>
                    <dd>
                      &nbsp;&nbsp;&nbsp;skills
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
    fetch('http://localhost:8000/api/getusers'
    ).then(response => 
      response.json()
    ).then(json => {
      this.setState({	results: json }, () => {
        this.setState({postSearch: !this.state.postSearch});
      });            
    })
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  render() {
    const results = this.Show();

    const hideAfterSearch = { // hide search bar and tags
      display: this.state.postSearch ? 'none' : 'inherit' 
    };

    return (
      <div className="MS-Container">
        <Helmet title="MemberSearch" meta={[ { name: 'description', content: 'Description of MemberSearch' }]} />

        {/* Header */}
        <Header />

        <main id="MS-main"> 
          <h1> Make Connections </h1>

          {/* Search Form */}
          <form id="MS-preSearchForm" style={hideAfterSearch}>
            <MdPerson className="MS-MdIcon" />
            <input type="search" placeholder="Member Search" />
          </form> 

          {/* Search Results */}
          {results}

          <h2 style={hideAfterSearch}> 
            Popular Tags 
          </h2>

          {/* Tag Row 1 */}
          <section id="MS-preSearchTagRowOne" style={hideAfterSearch}>
            <div>
              {this.state.skills.map((skill, index) => {
                while (index < 3) {
                  return (
                    <button
                      id="tags" 
                      key={`skill${skill.id}`}
                      onClick={ (e) => { this.tagClick(e,skill.name)}}
                    >
                      {skill.name}
                    </button>
                  );
                }
              })}
            </div>
          </section>

          {/* Tag Row 2 */}
          <section id="MS-preSearchTagRowTwo" style={hideAfterSearch}>
            <div>
              {this.state.skills.map((skill, index) => {
                while (index >= 3) {
                  return (
                    <button
                      id="tags" 
                      key={`skill${skill.id}`}
                      onClick={ (e) => {this.onClick(e,skill.name)}}
                    >
                      {skill.name}
                    </button>
                  );
                }
              })}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

MemberSearch.contextTypes = {
  router: React.PropTypes.object
};
