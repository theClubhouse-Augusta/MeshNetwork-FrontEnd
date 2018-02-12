/*
 *
 * Dashboard
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Card, { CardTitle, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { FormControl} from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { LinearProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';

import PreviousIcon from 'react-icons/lib/fa/arrow-left';
import NextIcon from 'react-icons/lib/fa/arrow-right';

import Header from 'components/Header';

import './style.css';
import './styleM.css';

export default class LMSDash extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      token:localStorage.getItem('lmsToken'),
      user:localStorage.getItem('lmsUser'),
      category:0,
      courses:[],
      categories:[],
      count:9,
      page:1,
      nextPage:0,
      previousPage:0,
      deleteDialog:false,
      snack: false,
      msg: "",
      app:this.props.app
    }
  }

  componentWillMount() {
    this.getCourses(0);
    this.getCategories();
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

  handleCategory = (event, index, value) => {
    this.setState({
      page:1,
      category:value
    }, function() {
      this.getCourses(value);
    })
  }

  handleDelete = (course = 0, index = 0) => {
    this.setState({
      deleteDialog: !this.state.deleteDialog,
      activeCourse:course.id,
      activeIndex:index
    });
  };

  getCourses = (category = 0) => {
    let _this = this;

    fetch('https://lms.innovationmesh.com/myCourses/'+category+'/'+this.state.count+'/'+this.state.page+'/', {
      method:'GET',
      headers: {
        'Authorization': 'JWT ' + this.state.token
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.error) {
        _this.props.history.push('/signIn');
      }
      else if(json.detail) {
        _this.props.history.push('/signIn');
      }
      else {
        this.setState({
          nextPage:json.nextPageNum,
          previousPage:json.previousPageNum,
          courses: json.courses,
          isLoading:false
        })
      }
    }.bind(this))
  };

  getNextCourses = (category) => {
    this.setState({
      page:this.state.nextPage
    }, function() {
      this.getCourses(category);
    })
  };

  getPreviousCourses = (category) => {
    this.setState({
      page:this.state.previousPage
    }, function() {
      this.getCourses(category);
    })
  };



  getCategories = () => {
    fetch("https://lms.innovationmesh.com/getCategories/", {
      method:'GET'
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

  createCourse = () => {
    let _this = this;

    fetch('https://lms.innovationmesh.com/storeCourse/', {
      method:'POST',
      headers:{'Authorization':'JWT ' + this.state.token}
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.detail) {
        _this.props.app.signOut();
        _this.props.app.handleAuth();
      }
      else {
        _this.props.history.push('/update/'+json.course)
      }
    }.bind(this))
  }

  deleteCourse = () => {
    let _this = this;
    let course = this.state.courses;
    fetch("https://lms.innovationmesh.com/deleteCourse/"+this.state.activeCourse+"/", {
      method:'POST',
      headers:{'Authorization':'JWT '+ this.state.token}
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      if(json.detail) {
        _this.props.app.signOut();
        _this.props.app.handleAuth();
      }
      else if(json.success) {
        _this.showSnack("Course Removed.");
        course.splice(this.state.activeIndex, 1);

        _this.setState({
          deleteDialog: !this.state.deleteDialog,
          course:course
        })
      }
    }.bind(this))
  }

  renderPageButtons = () => {
    let previousDisabled = false;
    let nextDisabled = false;
    let previousColor = "#6fc13e";
    let nextColor = "#6fc13e";

    if(this.state.previousPage === 0) {
      previousDisabled = true;
      previousColor = "#DDDDDD";
    }

    if(this.state.nextPage === 0) {
      nextDisabled = true;
      nextColor = "#DDDDDD";
    }

    return(
      <div className="lmsBrowseButtons">
        <FlatButton icon={<PreviousIcon color="#FFFFFF"/>} style={{background:previousColor, color:'#FFFFFF', width:'200px', height:'40px', marginLeft:'10px', marginRight:'10px'}} onClick={() => this.getPreviousCourses(this.state.category)} disabled={previousDisabled}>Previous</FlatButton>
        <FlatButton icon={<NextIcon color="#FFFFFF"/>} style={{color:"#FFFFFF", background:nextColor, width:'200px', height:'40px', marginLeft:'10px', marginRight:'10px'}} onClick={() => this.getNextCourses(this.state.category)} disabled={nextDisabled}>Next</FlatButton>
      </div>

    )
  }

  renderNewCourse = () => {
    if(this.state.user.roleID === 1 || this.state.user.roleID === 3) {
      return(
        <div className="lmsHomeMainBlock" onClick={this.createCourse}>
          <Card style={{height:'435px'}}>
            <CardMedia style={{width:'100%', height:'380px', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <img src="https://cdn3.iconfinder.com/data/icons/simple-toolbar/512/add_plus_new_user_green_page_file_up_text-512.png" style={{width:'100%', height:'auto'}}/>
            </CardMedia>
            <CardTitle title="Create a Course" />
          </Card>
        </div>
      )
    }
    else {
      return(<div style={{display:'none'}}></div>)
    }
  }

  renderProgress = (course) => {
    if(this.state.user) {
      if(this.state.user.roleID !== 3) {
        return(
          <div style={{marginTop:'10px'}}>
            <span className="lmsProgressHeader" style={{fontFamily:'Noto Sans'}}>Completed: {course.complete}</span>
            <LinearProgress mode="determinate" value={course.percent} />
          </div>
        )
      }
    } else {
      return(
        <div></div>
      )
    }
  }

  renderActions = (course, index) => {
    if(this.state.user) {
      if(this.state.user.userID === course.userID) {
        return(
          <CardActions>
            <Link to={'/LMS/Update/'+course.id}><FlatButton>Edit</FlatButton></Link>
            <FlatButton onClick={() => this.handleDelete(course, index)}>Delete</FlatButton>
          </CardActions>
        )
      }
    } else {
      return(
        <CardActions>
          <Link to={'/LMS/CourseInfo/'+course.id}><FlatButton>View Course</FlatButton></Link>
        </CardActions>
      )
    }
  }

  render() {

    const actions = [
      <FlatButton onClick={this.handleDelete}>Cancel</FlatButton>,
      <FlatButton onClick={this.deleteCourse}>Delete</FlatButton>
    ];

    return (
      <div className="container">
        <Helmet title="Dashboard" meta={[ { name: 'description', content: 'Description of Dashboard' }]}/>

        <header>
          <Header/>
        </header>

        <main className="lmsHomeMain">
          <div className="lmsHomeMainContainer">
            <div className="lmsHomeMainList">
              {this.renderNewCourse()}
              {this.state.courses.map((course, index) => (
                <div className="lmsHomeMainBlock" key={index}>
                  <Link style={{textDecoration:'none'}} to={'/LMS/CourseInfo/'+course.id}>
                    <Card style={{height:'385px'}}>
                      <CardMedia
                        style={{width:'100%', height:'240px', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}
                        image={'http://houseofhackers.me/media/' + course.courseImage}
                      />
                      <CardContent>
                        <Typography type="headline" component="h2">
                          {course.courseName}
                        </Typography>
                        {this.renderProgress(course)}
                      </CardContent>
                    </Card>
                  </Link>
                  <Card>
                    {this.renderActions(course, index)}
                  </Card>
                </div>
              ))}
            </div>
            {this.renderPageButtons()}
          </div>
        </main>

        <Dialog
          title="Delete Course"
          actions={actions}
          open={this.state.deleteDialog}
          onClose={this.handleDelete}
        >
          Are you sure you want to delete this Course?
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
