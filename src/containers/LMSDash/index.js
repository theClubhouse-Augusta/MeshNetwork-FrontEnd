/*
 *
 * Dashboard
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import FlatButton from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
// import { FormControl} from 'material-ui/Form';
// import Input, { InputLabel } from 'material-ui/Input';
import { LinearProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';

import PreviousIcon from 'react-icons/lib/fa/arrow-left';
import NextIcon from 'react-icons/lib/fa/arrow-right';

import Header from '../../components/Header';

import './style.css';
import './styleM.css';

export default class LMSDash extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user')),
      category: 0,
      courses: [],
      categories: [],
      count: 9,
      page: 1,
      nextPage: 0,
      previousPage: 0,
      deleteDialog: false,
      snack: false,
      msg: "",
      app: this.props.app
    }
  }

  componentDidMount() {
    this.getCourses(0);
    this.getCategories();
  }

  componentWillReceiveProps(app) {
    this.setState({
      app: app.app
    }, () => {
      this.forceUpdate();
    })
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  handleCategory = (event, index, value) => {
    this.setState({
      page: 1,
      category: value
    }, () => {
      this.getCourses(value);
    })
  }

  handleDelete = (course = 0, index = 0) => {
    this.setState({
      deleteDialog: !this.state.deleteDialog,
      activeCourse: course.id,
      activeIndex: index
    });
  };

  getCourses = (category = 0) => {

    fetch('https://suggestify.io/api/myCourses/' + this.state.count + '?page=' + this.state.page, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          this.props.history.push('/signIn');
        }
        else {
          let nextPage = 0;
          let previousPage = 0;
          if (json.courses.last_page !== json.courses.current_page) {
            nextPage = this.state.page + 1;
            if (json.courses.current_page !== 1) {
              previousPage = this.state.page - 1;
            }
          } else if (json.courses.last_page === json.courses.current_page) {
            if (json.courses.current_page !== 1) {
              previousPage = this.state.page - 1;
            }
          }
          this.setState({
            nextPage: nextPage,
            previousPage: previousPage,
            courses: json.courses.data,
            isLoading: false
          })
        }
      })
  };

  getNextCourses = (category) => {
    this.setState({
      page: this.state.nextPage
    }, () => {
      this.getCourses(category);
    })
  };

  getPreviousCourses = (category) => {
    this.setState({
      page: this.state.previousPage
    }, () => {
      this.getCourses(category);
    })
  };



  getCategories = () => {
    fetch("https://suggestify.io/api/getCategories", {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          categories: json.categories
        })
      })
  }

  createCourse = () => {

    fetch('https://suggestify.io/api/storeCourse', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          this.showSnack("Your session has expired.");
        }
        else {
          this.props.history.push('/LMS/Update/' + json.course)
        }
      })
  }

  deleteCourse = () => {
    let course = this.state.courses;
    fetch("https://suggestify.io/api/deleteCourse/" + this.state.activeCourse, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.error) {
          this.showSnack("Your session has expired.");
        }
        else if (json.success) {
          this.showSnack("Course Removed.");
          course.splice(this.state.activeIndex, 1);

          this.setState({
            deleteDialog: !this.state.deleteDialog,
            course: course
          })
        }
      })
  }

  renderPageButtons = () => {
    let previousDisabled = false;
    let nextDisabled = false;
    let previousColor = "#6fc13e";
    let nextColor = "#6fc13e";

    if (this.state.previousPage === 0) {
      previousDisabled = true;
      previousColor = "#DDDDDD";
    }

    if (this.state.nextPage === 0) {
      nextDisabled = true;
      nextColor = "#DDDDDD";
    }

    return (
      <div className="lmsBrowseButtons">
        <FlatButton icon={<PreviousIcon color="#FFFFFF" />} style={{ background: previousColor, color: '#FFFFFF', width: '200px', height: '40px', marginLeft: '10px', marginRight: '10px' }} onClick={() => this.getPreviousCourses(this.state.category)} disabled={previousDisabled}>Previous</FlatButton>
        <FlatButton icon={<NextIcon color="#FFFFFF" />} style={{ color: "#FFFFFF", background: nextColor, width: '200px', height: '40px', marginLeft: '10px', marginRight: '10px' }} onClick={() => this.getNextCourses(this.state.category)} disabled={nextDisabled}>Next</FlatButton>
      </div>

    )
  }

  renderNewCourse = () => {
    if (this.state.user.roleID === 1 || this.state.user.roleID === 4) {
      return (
        <div className="lmsHomeMainBlock" onClick={this.createCourse}>
          <Card style={{ height: '380px' }}>
            <CardMedia style={{ width: '100%', height: '380px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} image="https://cdn3.iconfinder.com/data/icons/simple-toolbar/512/add_plus_new_user_green_page_file_up_text-512.png" />
          </Card>
        </div>
      )
    }
    else {
      return (<div style={{ display: 'none' }}></div>)
    }
  }

  renderProgress = (course) => {
    if (this.state.user) {
      if (this.state.user.roleID !== 4) {
        return (
          <div style={{ marginTop: '10px' }}>
            <span className="lmsProgressHeader" style={{ fontFamily: 'Noto Sans' }}>Completed: {course.complete}</span>
            <LinearProgress variant="determinate" value={course.percent} />
          </div>
        )
      }
    } else {
      return (
        <div></div>
      )
    }
  }

  renderActions = (course, index) => {
    if (this.state.user) {
      if (this.state.user.id === course.userID) {
        return (
          <CardActions>
            <Link to={'/LMS/Update/' + course.id}><FlatButton>Edit</FlatButton></Link>
            <FlatButton onClick={() => this.handleDelete(course, index)}>Delete</FlatButton>
          </CardActions>
        )
      }
    } else {
      return (
        <CardActions>
          <Link to={'/LMS/CourseInfo/' + course.id + '/' + this.state.user.id}><FlatButton>View Course</FlatButton></Link>
        </CardActions>
      )
    }
  }

  renderImage = (image) => {
    if (image) {
      return (
        <CardMedia
          style={{ width: '100%', height: '240px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          image={image}
        />
      )
    } else {
      return (
        <CardMedia
          style={{ width: '100%', height: '240px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          image={'https://s3.us-east-2.amazonaws.com/suggestify/5249e9_placeholder.gif'}
        />
      )
    }
  }

  render() {
    return (
      <div className="container">
        <Helmet title="Dashboard" meta={[{ name: 'description', content: 'Description of Dashboard' }]} />

        <header>
          <Header space={this.props.spaceName} />
        </header>

        <main className="lmsHomeMain">
          <div className="lmsHomeMainContainer">
            <div className="lmsDashMainList">
              {this.renderNewCourse()}

              {this.state.courses.map((course, index) => (
                <div className="lmsHomeMainBlock" key={`LMSDASHnewcourse${index}`}>
                  <Link style={{ textDecoration: 'none' }} to={'/LMS/CourseInfo/' + course.id + '/' + this.state.user.id}>
                    <Card style={{ height: '380px' }}>
                      {this.renderImage(course.courseImage)}
                      <CardContent>
                        <Typography variant="headline" component="h2">
                          {course.courseName}
                        </Typography>
                        {/*this.renderProgress(course)*/}
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
          open={this.state.deleteDialog}
          onClose={this.handleDelete}
        >
          <DialogTitle id="alert-dialog-title">{"Delete Course"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this Course?
  
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <FlatButton onClick={this.handleDelete}>Cancel</FlatButton>
            <FlatButton onClick={this.deleteCourse}>Delete</FlatButton>
          </DialogActions>
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
