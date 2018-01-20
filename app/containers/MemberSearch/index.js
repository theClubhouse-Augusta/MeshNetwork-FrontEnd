/*
 *
 * MemberSearch
 *
 */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { oneOfType } from 'prop-types';
/* Icons */
import MdPerson from 'react-icons/lib/md/person';

import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

/* Components */
import Helmet from 'react-helmet';
import Header from 'components/Header';

import authenticate from '../../utils/Authenticate';
/* css */
import './style.css';
import './styleM.css';

export default class MemberSearch extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            results: [],
            query: '',
            token: localStorage.getItem('token'),
            msg: "",
            snack: false,
            loading: true,
        };
    }

    handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
    showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

    async componentWillMount() {
        const authorized = await authenticate(localStorage['token'], this.props.history)
        if (!authorized.error) {
            this.loadSkills();
            this.setState({loading: false})
        } else {
            this.props.history.push('/signIn');
        }
    }


    loadSkills = () => {
        fetch('https://innovationmesh.com/api/skills', {
            //headers: { Authorization: `Bearer ${this.token}` },
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ skills: json });
            })
    }

    searchQuery = (e) => {
        this.setState({ query: e.target.value.trim() });
    }

    // submit form if 'enter' is pressed
    checkKey = (e) => {
        if (e.keyCode === 13 && this.state.query) {
            fetch(`https://innovationmesh.com/api/search/?query=${encodeURIComponent(this.state.query)}`, {
                //headers: { Authorization: `Bearer ${this.token}` },
            })
                .then(response =>
                    response.json())
                .then(json => {
                    if (!json.error) {
                        this.setState({ results: json });
                    } else {
                        this.showSnack(json.error);

                    }
                })
        }
    }

    ShowSearchResults = () => {
        return (
            <div id="MS-postSearchContainer">
                {/* User Cards */}
                <ul>
                    {this.state.results.map((user, index) => {
                        if (!!user.id) {
                            return (
                                <li
                                    onClick={() => { this.props.history.push(`/UserProfile/${user.id}`); }}
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
                                            <dd> &nbsp;&nbsp;&nbsp;{user.name} </dd>
                                        </div>

                                        <div>
                                            <dt>company:</dt>
                                            <dd> &nbsp;&nbsp;&nbsp;{user.company} </dd>
                                        </div>

                                        <div>
                                            <dt>Email:</dt>
                                            <dd> &nbsp;&nbsp;&nbsp;{user.email} </dd>
                                        </div>
                                    </dl>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        );
    }

    tagClick = (tag) => {
        fetch(`https://innovationmesh.com/api/search/?tag=${encodeURIComponent(tag)}`, {
            //headers: { Authorization: `Bearer ${this.token}` },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                if (json.error) {
                    this.showSnack(json.error)
                }
                else {
                    this.setState({ results: json });
                }
            }.bind(this))
    }

    renderTag = (skill, i) => {
        let chipStyle = {
            color: "#FFFFFF",
            margin: '5px',
            borderRadius: '5px',
            background: '#ff4d58'
        }

        /*let rand = Math.random() * (10 - 1) + 1;

        chipStyle.animation = 'flicker '+ rand + 's ease alternate infinite';*/

        return (
            <Chip style={chipStyle} key={i} label={skill.name} onClick={() => { this.tagClick(skill.name) }} />
        )

    }

    render() {
        return (
            this.state.loading
            ?
                <div>spinner here</div>
            :
            <div className="membersContainer">
                <Helmet title="MemberSearch" meta={[{ name: 'description', content: 'Description of MemberSearch' }]} />

                <header style={{ background: '#FFFFFF' }}>
                    <Header />
                    <div className="membersBanner">
                        <div className="homeHeaderContentTitle">Connect with People</div>
                        <div className="homeHeaderContentSubtitle">Discover new and innovative members</div>
                    </div>
                </header>

                <main className="memberSearchMain">
                    <div className="">
                    </div>
                    <TextField style={{ width: '100%', maxWidth: '700px', textAlign: 'center', marginBottom: '10px', color: '#FFFFFF' }} label="Member Search" value={this.state.query} onChange={this.searchQuery} onKeyDown={(e) => { this.checkKey(e); }} />

                    <div className="membersSubTitle">Popular Skills</div>

                    <div className="tagsBox">
                        {this.state.skills.map((skill, i) => (
                            this.renderTag(skill, i)
                        ))}
                    </div>

                    <div className="memberSearchResults">
                        {this.state.results.map((user, index) => (
                            <Link to={'/user/' + user.id} className="eventBlock">
                                <div className="eventBlockImage">
                                    <img src={user.avatar} style={{ width: '100%', height: 'auto' }} />
                                </div>
                                <div className="eventBlockInfo">
                                    <div className="eventBlockTitle">{user.name}</div>
                                    <div className="eventBlockDesc">
                                        {user.title}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>
                <footer className="homeFooterContainer">
                    Copyright © 2018 theClubhou.se  • 540 Telfair Street  •  Tel: (706) 723-5782
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
    redirect: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.string.isRequired,
    ]),
    getLoggedInUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};
