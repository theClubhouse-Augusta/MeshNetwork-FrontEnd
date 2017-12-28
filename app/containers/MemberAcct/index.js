/*
 *
 * MemberAcct
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Tabs, { Tab } from 'material-ui/Tabs'; 
import MdFileUpload from 'react-icons/lib/md/file-upload';
import Snackbar from 'material-ui/Snackbar'; 
import Select from 'react-select';

import MtextField from '../../components/CustomUi/MtextField'; 
import DefaultButton from '../../components/CustomUi/DefaultButton'; 
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
import ProfileSettings from '../../components/ProfileSettings'; 
import AccountSettings from '../../components/AccountSettings';
import SecurityNotifSettings from '../../components/SecurityNotifSettings'; 

import './style.css';
import './styleM.css';

export default class MemberAcct extends React.PureComponent {
  state= {
    selectedTab: {},
    email: '',
    password: '',
    password2: '',
    website: '',
    phoneNumber: '',
    bio: '',
    selectedTag: '',
    selectedTags: [],
    loadedTags: '',
    avatar: '',
    imagePreviewUrl: '',
    value: 0, 
    name: '',
    email: '',
    error: false,
    // searchOpt: '',
    snackBar: false,
  }; 

  componentDidMount() {
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

  handleChange = (event, value) => {
    this.setState({ value }); 
  }; 


  name = e => this.setState({	name: e.target.value.replace(/\s\s+/g, ' ').trim() }); 
  title = e => this.setState({	name: e.target.value.replace(/\s\s+/g, ' ').trim() }); 
  // workspace = e => this.setState({ workspace: e.target.value  });
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
  bio = e => this.setState({ bio: e.target.value});

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

 render() {

    const { 
      email, 
      password, 
      password2, 
      value, 
      error, 
      bio,
      loadedTags,
      selectedTags,
      snackBar,
      snackBarMessage,
      imagePreviewUrl
    } = this.state; 

    return (
      <div className="container">
        <Helmet title="MemberAcct" meta={[ { name: 'description', content: 'Description of MemberAcct' }]}/>
        <Header /> 

        <main> 
          <div className="acctBanner"> 
            <h2> account settings </h2>
          </div>

          <div className="acctBody"> 
            <Tabs 
              value={value} 
              style={{maxWidth: '1000px', margin: '0 auto'}} onChange={this.handleChange}
              centered 
            > 
              <Tab label="Profile"> </Tab>
              <Tab label="Account"> </Tab>
             {/* } <Tab label="Security & Notifications"> </Tab> */} 
            </Tabs>

          {value === 0 && 
          <ProfileSettings 
            name={this.name} 
            title={this.title}
            website={this.website}
            bio={this.bio}
          />}  
          {value === 1 &&  <AccountSettings /> }       
         {/* {value === 2 &&   <SecurityNotifSettings /> }  */}    

          </div>   
        </main> 

        <Footer />         
      </div>
    );
  }
}
