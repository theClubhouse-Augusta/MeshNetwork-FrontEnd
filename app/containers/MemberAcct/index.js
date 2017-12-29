/*
 *
 * MemberAcct
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Tabs, { Tab } from 'material-ui/Tabs'; 
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

export default class MemberAcct extends React.Component {
  state = {
    // selectedTab: {},
    // email: '',
    password: '',
    password2: '',
    website: '',
    phoneNumber: '',
    bio: '',
    selectedTag: '',
    selectedTags: [],
    loadedTags: [],
    avatar: '',
    imagePreviewUrl: '',
    value: 0, 
    name: '',
    title: '',
    company: '',
    hireable: false,
    error: false,
    snackBar: false,
    snackBarMessage: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    github: '',
    dribble: '',
    behance: '',
    angellist: '',
  }; 

  componentDidMount() {
    this.loadSkills();
    this.loadUserSkills();
  }

  loadSkills = () => {
    fetch('http://localhost:8000/api/skills/all', {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
    .then(response => response.json())
    .then(json => this.setState({ loadedTags:json }))
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  loadUserSkills = () => {
    fetch('http://localhost:8000/api/userskills', {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
    .then(response => response.json())
    .then(json => {this.setState({ selectedTags:json })})
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
    });
  }

  handleChange = (event, value) => {
    this.setState({ value }); 
  }; 


  name = e => this.setState({	name: e.target.value.replace(/\s\s+/g, ' ').trim() }); 
  title = e => this.setState({	title: e.target.value.replace(/\s\s+/g, ' ').trim() }); 
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
  hireable = e => this.setState({	hireable: !this.state.hireable });

	selectTag = selectedTag => {
    const selectedTags = selectedTag.slice(0, (selectedTag.length - 1));
    const selected = selectedTag.slice(-1)[0];

    const loaded = this.state.loadedTags.slice(1);
    const s = this.state.selectedTags.slice();

    if (!!selected.id) {
      this.setState({ selectedTags: selectedTag });
    } else {
      selected.value = selected.value.replace(/\s\s+/g, ' ').trim();
      selected.label = selected.label.replace(/\s\s+/g, ' ').trim();
      const duplicateLoaded = loaded.findIndex(tag => tag.label === selected.label);
      const duplicateSelected = s.findIndex(tag => tag.label === selected.label);
      if (duplicateLoaded === -1 && duplicateSelected === -1) {
        selectedTags.push(selected);
        this.setState({	selectedTags: selectedTags });
      } else {
        this.setState({	selectedTags: selectedTags });
      }
    }
    // else {
      // this.setState({ selectedTags: selectedTag });
    // }
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

  toggleHireable =  () => this.setState({ hireable: !this.state.hireable});
  facebook  = e => this.setState({ facebook: e.target.value });
  twitter  = e => this.setState({ twitter:e.target.value });
  instagram  = e => this.setState({ instagram: e.target.value });
  linkedin = e => this.setState({ linkedin: e.target.value });
  github  = e => this.setState({ github: e.target.value });
  dribble  = e => this.setState({ dribble: e.target.value });
  behance  = e => this.setState({ behance: e.target.value });
  angellist = e => this.setState({ angellist: e.target.value });

  toggleSnackBar = (message) => 
    this.setState({	
      snackBar: !this.state.snackBar, 
      snackBarMessage: message
    });

 render() {
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
              value={this.state.value} 
              style={{maxWidth: '1000px', margin: '0 auto'}} onChange={this.handleChange}
              centered 
            > 
              <Tab label="Profile"> </Tab>
              <Tab label="Account"> </Tab>
             {/* } <Tab label="Security & Notifications"> </Tab> */} 
            </Tabs>

          {this.state.value === 0 && 
          <ProfileSettings 
            // functions
            name={this.name} 
            title={this.title}
            website={this.website}
            bio={this.bio}
            avatar={this.avatar}
            company={this.company}
            toggleHireable={this.toggleHireable}
            selectTag={this.selectTag}
            facebook={this.facebook}
            twitter={this.twitter}
            instagram={this.instagram}
            linkedin={this.linkedin}
            github={this.github}
            dribble={this.dribble}
            behance={this.behance}
            angellist={this.angellist}
            // form values
            Name={this.state.name} 
            Title={this.state.title}
            Website={this.state.website}
            //Bio={bio}
            Company={this.state.company}
            Facebook={this.state.facebook}
            Twitter={this.state.twitter}
            Instagram={this.state.instagram}
            Linkedin={this.state.linkedin}
            Github={this.state.github}
            Dribble={this.state.dribble}
            Behance={this.state.behance}
            Angellist={this.state.angellist}
            hireable={this.state.hireable}
            imagePreviewUrl={this.state.imagePreviewUrl}
            selectedTags={this.state.selectedTags}
            loadedTags={this.state.loadedTags}
          />}  
          {this.state.value === 1 &&  <AccountSettings />}       
         {/* {value === 2 &&   <SecurityNotifSettings /> }  */}    
          </div>   
        </main> 

        <Footer />         
        <Snackbar 
          open={this.state.snackBar} 
          message={this.state.snackBarMessage} 
          autoHideDuration={4000} 
        />
      </div>
    );
  }
}
