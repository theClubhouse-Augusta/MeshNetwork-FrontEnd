/**
*
* SideNav
*
*/

import React from 'react';
import { Link } from 'react-router-dom';

import AddIcon from 'react-icons/lib/md/add';
import Snackbar from 'material-ui/Snackbar';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import FlatButton from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import './style.css';
import './styleM.css';

export default class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories:[],
      categoryName:"",
      categoryImage:"",
      categoryImagePreview:"",
      categoryOpen:false,
      app:this.props.app
    }
  }

  componentWillReceiveProps(app) {
    this.setState({
      app:app.app
    }, function() {
      this.forceUpdate();
    })
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  categoryDialog = () => {this.setState({categoryOpen:!this.state.categoryOpen})}

  componentWillMount() {
    this.getCategories();
  }

  handleCategoryName = (event) => {this.setState({categoryName:event.target.value})};
  handleCategoryImage = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        categoryImage: file,
        categoryImagePreview: reader.result
      })
    }
    reader.readAsDataURL(file);
  };

  getCategories = () => {
    fetch("http://challenges.innovationmesh.com/api/getCategories", {
      method:'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        categories:json.categories
      })
    }.bind(this))
  }

  storeCategory = () => {
    let _this = this;
    let data = new FormData();
    let categories = this.state.categories;

    data.append('categoryName', this.state.categoryName);
    data.append('categoryImage', this.state.categoryImage);
    fetch("http://challenges.innovationmesh.com/api/storeCategory", {
      method:'POST',
      body:data,
      headers: {'Authorization':'Bearer ' + this.state.app.state.token}
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error) {
        if(json.error === 'token_expired') {
          _this.categoryDialog();
          _this.props.app.signOut(0, 'Your session has expired.');
          _this.props.app.handleAuth();
          _this.showSnack("Your session has expired.");
        }
        else {
          _this.showSnack(json.error);
        }
      }
      else if(json.category) {
        categories.push(json.category);
        this.setState({
          categories:json.categories
        })
        _this.categoryDialog();
        _this.showSnack(json.success);
      }
    }.bind(this))
  }

  renderCategoryImageText = () => {
    if(this.state.categoryImagePreview === "" || this.state.categoryImagePreview === undefined || this.state.categoryImagePreview === null) {
      return(
        <span style={{display:'flex', flexDirection:'column', textAlign:'center'}}>
          Upload Category Image
          <span style={{fontSize:'0.9rem', marginTop:'5px'}}>For Best Size Use: 1280 x 720</span>
        </span>
      )
    }
  }

  renderCategoryImage = () => {
    if(this.state.categoryImage === "")
    {
      return(
        <img src={this.state.categoryImagePreview} className="challenges_newChallengeImagePreview"/>
      )
    }
    else {
      return(
        <img src={this.state.categoryImagePreview} className="challenges_newChallengeImagePreview"/>
      )
    }
  }

  renderAdd = () => {
    if(this.state.app.state.user)
    {
      return(
        <div className="challenges_categoryButton"><AddIcon style={{cursor:'pointer'}} onClick={this.categoryDialog}/></div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="challenges_categoryHeader">
          <div className="challenges_categoryTitle">Categories</div>
          {this.renderAdd()}
        </div>
        {this.state.categories.map((c, i) => (
          <Link to={'/Challenges/Discover/' + c.categorySlug} className="challenges_categoryBlock" key={i}>
            <img src={c.categoryImage} className="challenges_categoryIcon"/>
            <div className="challenges_categoryName">{c.categoryName}</div>
          </Link>
        ))}

        <Dialog onRequestClose={this.categoryDialog} open={this.state.categoryOpen}>
          <DialogTitle>Create a New Category</DialogTitle>
          <div style={{paddingLeft:'15px', paddingRight:'15px', paddingBottom:'15px'}}>
            <TextField
              id="categoryName"
              label="Category Name"
              value={this.state.categoryName}
              onChange={this.handleCategoryName}
              margin="normal"
              fullWidth={true}
            />
            <div>
              <label htmlFor="category-image" className="challenges_challengeImageBlock">
                {this.renderCategoryImageText()}
                {this.renderCategoryImage()}
              </label>
              <input type="file" onChange={this.handleCategoryImage} id="category-image" style={{display:'none'}}/>
            </div>
          </div>
          <FlatButton style={{background:'#32b6b6', color:'#FFFFFF'}} onClick={this.storeCategory}>Confirm</FlatButton>
        </Dialog>

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
