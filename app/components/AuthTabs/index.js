/**
*
* AuthTabs
*
*/
import React from 'react';
import MdFileUpload from 'react-icons/lib/md/file-upload';
import { Redirect } from 'react-router-dom';  
import Snackbar from 'material-ui/Snackbar'; 
import PropTypes from 'prop-types';
import Select from 'react-select';
import Tabs, { Tab } from 'material-ui/Tabs'; 
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-select/dist/react-select.css';

import MtextField from '../../components/CustomUi/MtextField'; 
import DefaultButton from '../../components/CustomUi/DefaultButton'; 


import './style.css';
import './styleM.css';

function TabContainer(props) {
  return <div className="divContentWrapper">{props.children}</div> 
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default class AuthTabs extends React.PureComponent {
    state = {
      workspaces: '',
      selectedTab: {},
      email: '',
      password: '',
      password2: '',
      website: '',
      phoneNumber: '',
      description: EditorState.createEmpty(),
      selectedTag: '',
      selectedTags: [],
      loadedTags: '',
      avatar: '',
      imagePreviewUrl: '',
      value: 0, 
      // signup
      name: '',
      email: '',
      website: '',
      workspace: '', 
      error: false,
      searchOpt: '',
      snackBar: false,
    };

  componentDidMount() {
    this.getSpaces();
    this.loadSkills();
  }

  loadSkills = () => {
    fetch('http://localhost:8000/api/skills/all', {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
    .then(response => response.json())
    .then(json => {this.setState({ loadedTags:json })})
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  getSpaces = () => {
    fetch(`http://localhost:8000/api/workspaces`,)
    .then(response => response.json())
    .then(Workspaces => {
      if (!Workspaces.error) {
        this.setState({	
          workspaces: Workspaces,
          workspace: Workspaces[0].name, 
        });
      }
    })
    .catch(error => {
      alert(`error in fetching data from server: ${error}`); // eslint-disable-line
    });
  }
  
  handleChange = (event, value) => (
    this.setState({ 
      value: value,
      email: '',
      password: '', 
    })
  )

  name = e => this.setState({	name: e.target.value.replace(/\s\s+/g, ' ').trim() }); 
  workspace = e => this.setState({ workspace: e.target.value  });
  email = e => this.setState({	email : e.target.value.trim() }); 
  password = e => this.setState({	password: e.target.value }); 
  password2 = e => this.setState({	password2: e.target.value });
  confirmPassword = () => {
     if (this.state.password !== this.state.password2) {
      this.setState({	error: true }) 
     } else {
       this.setState({	error: false }); 
     }
  }
  company = e => this.setState({	company: e.target.value }); 
  website = e => this.setState({	website: e.target.value }); 
  phone = e => this.setState({	phoneNumber: e.target.value }); 
  description = (editorState) => {this.setState({ description: editorState });}
  searchOpt = () => this.setState({ searchOpt: !this.state.searchOpt });

	selectTag = selectedTag => {
    const copy = selectedTag.slice(-1)[0];
    if (copy !== undefined) {
      copy.value = copy.value.replace(/\s\s+/g, ' ').trim();
      copy.label = copy.label.replace(/\s\s+/g, ' ').trim();
      this.setState({ selectedTags: selectedTag });
    } else {
      this.setState({ selectedTags: selectedTag });
    }
  }

  avatar = e => {
    e.preventDefault();
    let avatar = e.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
      this.setState({	
        imagePreviewUrl: reader.result,
        avatar: avatar
       });
    };
    reader.readAsDataURL(avatar);
  }

  toggleSnackBar = (message) => 
    this.setState({	
      snackBar: !this.state.snackBar, 
      snackBarMessage: message
    });

  signUp = (e) => {
    e.preventDefault();
    if (this.state.error) {
      this.toggleSnackBar("Passwords do not match");
      return;
    }
    let data = new FormData();
    data.append('description', JSON.stringify(draftToHtml(convertToRaw(this.state.description.getCurrentContent()))));
    data.append('tags', JSON.stringify(this.state.selectedTags));
    data.append('name', this.state.name);
    data.append('workspace', this.state.workspace);
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    data.append('company', this.state.company);
    data.append('website', this.state.website);
    data.append('phonenumber', this.state.phonenumber);
    data.append('searchOpt', this.state.searchOpt ? 1 : 0);
    data.append('avatar', this.state.avatar);

    fetch(`http://localhost:8000/api/signUp`, {
      method: 'post',
      body: data,
    })
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        this.props.login(e, this.state.email, this.state.password);
      } else {
        this.toggleSnackBar(json.error);
      }
    })
    .catch(error => {
      this.toggleSnackBar(JSON.stringify(error));
    })
  }

  render() {
    const { login, redirect, } = this.props;

    const { 
      email, 
      password, 
      password2, 
      value, 
      workspaces, 
      error, 
      searchOpt,
      description,
      loadedTags,
      selectedTags,
      snackBar,
      snackBarMessage,
      imagePreviewUrl
    } = this.state; 

    return (
      <form autoComplete="off" className="authTabsContainer"> 
        {redirect}
        <Tabs value={value} onChange={this.handleChange} centered indicatorColor="#cccc31">
          <Tab label ="Login" className="authTabTitle" />                
          <Tab label="Sign up" className="authTabTitle"/>   
        </Tabs>

        {value === 0 && 
        <TabContainer> 
          <div id="loginForm">
            <p className="userFormItem">
              <label htmlFor="email">email</label>
              <MtextField 
                onChange={this.email}
                type="email"
                name=""
                id="email"
              />
            </p>

            <p className="userFormItem">
              <label htmlFor="password">password</label>
              <MtextField 
                onChange={this.password}
                type="password"
                name=""
                id="password"
              />           
            </p>

            <div className="forgotInfo">
              <a href="" className="userInfoLink">forgot password </a>
            </div>  

            <div className="userFormSubmit">
              <DefaultButton login={login} email={email} password={password}>
                Submit 
              </DefaultButton> 
            </div>
          </div>

           
        </TabContainer>}

        {value === 1 && 
        <TabContainer> 
          <div id="signUpForm">
            <p className="userFormItem">
              <label htmlFor="name" className="userFormLabel">name</label>
              <MtextField onChange={this.name} type="text" name="" id="name" />
            </p>
            {!!workspaces.length &&
            <div className="userFormItem">
              <label htmlFor="homespace" className="userFormLabel"> your home space</label>
              <select value={this.state.workspace} onChange={this.workspace}> 
                {workspaces.map((workspace, key) =>
                  <option value={workspace.name} name={`option${key}`} key={`space${key}`}>{workspace.name}</option>
                )}
              </select>   
            </div>}

            <p className="userFormItem">
              <label htmlFor="email" className="userFormLabel">
                email
              </label>
              <MtextField 
                onChange={this.email}
                type="email" 
                name="" 
                id="email" 
              />
            </p>

            <p className="userFormItem">
              <label htmlFor="password" className="userFormLabel">password</label>
              <MtextField onChange={this.password} type="password" name="" id="password" />
            </p>

            <p className="userFormItem">
              <label htmlFor="confirmPassword" className="userFormLabel">confirm password</label>
              <MtextField 
                onChange={this.password2} 
                onBlur={this.confirmPassword} 
                error={error}
                type="password" 
                id="confirmPassword" 
              />
            </p>


           
            <div className="userFormSubmit">
              <button type="submit" onClick={this.signUp}> submit </button>
            </div>
          </div>
        </TabContainer>}
        <Snackbar open={snackBar} message={snackBarMessage} autoHideDuration={4000} onRequestClose={this.toggleSnackBar} />
      </form>   
    );
  }
}

AuthTabs.propTypes = {
  login: PropTypes.func.isRequired,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

