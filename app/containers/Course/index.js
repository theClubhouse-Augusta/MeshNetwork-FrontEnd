/*
 *
 * Detail
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import YoutubeIcon from 'react-icons/lib/fa/youtube-play';
import TextIcon from 'react-icons/lib/fa/file-text-o';
import ExamIcon from 'react-icons/lib/fa/question';
import FileIcon from 'react-icons/lib/fa/file-archive-o';

import Header from 'components/Header';

import './style.css';
import './styleM.css';

export default class Course extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      token:localStorage.getItem('token'),
      user:JSON.parse(localStorage.getItem('user')),
      course:"",
      lessons:[],
      videoDialog:false,
      snack: false,
      msg: "",
      app:this.props.app
    }
  }

  handleRequestClose = () => { this.setState({ snack: false, msg: "" }); };
  showSnack = (msg) => { this.setState({ snack: true, msg: msg }); };

  componentWillMount() {
    this.getCourse(this.props.match.params.id);
  }

  componentWillReceiveProps(app) {
    this.setState({
      app:app.app
    }, () => {
      this.forceUpdate();
    })
  }

  handleVideo = () => {
    this.setState({videoDialog:!this.state.videoDialog})
  }

  getCourse = (id) => {
    fetch("https://innovationmesh.com/api/detailCourse/"+id, {
      method:'GET'
    })
    .then(response => response.json())
    .then(json => {
      let lessons = json.lessons;

      for(let i = 0; i < lessons.length; i++) {
        lessons[i].lectures = [];

        for(let j = 0; j < json.lectures.length; j++) {
          if(lessons[i].id === json.lectures[j].lessonID) {
            lessons[i].lectures.push(json.lectures[j]);
          }
        }
      }
      this.setState({
        course:json.course,
        lessons:lessons
      })
    })
  }

  enrollCourse = () => {

    fetch("https://innovationmesh.com/api/enrollCourse/"+this.state.course.id, {
      method:'GET',
      headers: {
        'Authorization':'Bearer ' + this.state.token
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if(json.error) {
        this.props.history.push(`/LMS/CourseInfo/${this.state.course.id}/${this.state.user.id}`)
      }
      else {
        this.showSnack(json.success);
        setTimeout(() => {
          this.props.history.push(`/LMS/CourseInfo/${this.state.course.id}`)
      }, 2000);
      }
    })
  }

  renderIcon = (type) => {
    if(type === "Video") { return(<YoutubeIcon/>) }
    else if(type === "Exam") { return(<ExamIcon/>) }
    else if(type === "Text") { return(<TextIcon/>) }
    else if(type === "File") { return(<FileIcon/>) }
  }

  renderEnroll = () => {
    if(this.state.token) {
      return(
        <FlatButton onClick={this.enrollCourse} style={{background:"#6fc13e", color:'#FFFFFF', border:'2px solid #6fc13e', height:'50px', marginLeft:'10px', marginRight:'10px', marginTop:'10px'}}>See the Course</FlatButton>
      )
    } else {
      return(
        <Link to={'/signUp'}><FlatButton style={{background:"#6fc13e", color:"#FFFFFF", border:'2px solid #6fc13e', height:'50px', marginLeft:'10px', marginRight:'10px'}}>Enroll Now</FlatButton></Link>
      )
    }
  }

  render() {

    // let headerStyle = {

    // }

    let promoVideo = <FlatButton onClick={this.handleVideo} style={{color:'#FFFFFF', border:'2px solid #FFFFFF', height:'50px', marginLeft:'10px', marginRight:'10px'}}>Promo Video</FlatButton>;
    if(!this.state.course.courseVideo) {
      promoVideo = ""
    }

    return (
      <div className="container">
        <Helmet title="Detail" meta={[ { name: 'description', content: 'Description of Detail' }]}/>
        <Header space={this.props.spaceName} />
        <header className="lmsDetailHeader" style={{
          background:'linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)),url(' + this.state.course.courseImage +')',

        }}>
          <div className="lmsDetailHeaderHeading">
            {this.state.course.courseName}
          </div>
          <div className="lmsDetailHeaderText">
            {/*this.state.course.courseSummary*/}
          </div>
          <div className="lmsDetailHeaderButtons">
            {promoVideo}
            {this.renderEnroll()}
          </div>
        </header>

        <main>
          <div className="lmsDetailContent">
            <div dangerouslySetInnerHTML={{ __html: this.state.course.courseInformation }} />
          </div>
          <div className="lmsDetailAuthor">
            <div className="lmsDetailAuthorContainer">
              <div className="lmsDetailAuthorAvatar">
                <img alt="" className="lmsDetailAuthorAvatarImg" src={this.state.course.courseInstructorAvatar}/>
              </div>
              <div className="lmsDetailAuthorInfo">
                <div className="lmsDetailAuthorName">{this.state.course.courseInstructorName}</div>
                <div className="lmsDetailAuthorContent">
                  {this.state.course.courseInstructorInfo}
                </div>
              </div>
            </div>
          </div>

          <div className="lmsDetailCourses">
            <div className="lmsDetailCoursesContainer">
              <div className="lmsDetailCoursesHeader">Class Curriculum</div>
              {this.state.lessons.map((lesson, i) => (
                <div className="lmsDetailCoursesBlock" key={`lessons${i}`}>
                  <div className="lmsDetailCoursesBlockHeader">{lesson.lessonName}</div>
                  <div className="lmsDetailCoursesBlockList">
                    {lesson.lectures.map((lecture, j) => (
                      <div className="lmsDetailCoursesBlockItem" key={`lmscourses${j}`}>
                        <div className="lmsDetailCoursesBlockInfo">
                          <div className="lmsDetailCoursesBlockIcon">
                            {this.renderIcon(lecture.lectureType)}
                          </div>
                          <div className="lmsDetailCoursesBlockTitle">
                            {lecture.lectureName}
                          </div>
                        </div>
                        <div className="lmsDetailCoursesBlockButton">
                          {/*<Link to={"/LMS/Lesson/"+this.props.match.params.id+"/"+lecture.id}><FlatButton style={{background:"#6fc13e", color:'#FFFFFF'}}>Start</FlatButton></Link>*/}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>
          <div className="lmsDetailFaq">
            <div className="lmsDetailFaqContainer">
              <div className="lmsDetailFaqHeader">Frequently Asked Questions</div>
              <div className="lmsDetailFaqBlock">
                <div className="lmsDetailFaqBlockHeader">When does the course start and finish?</div>
                <div className="lmsDetailFaqBlockContent">The course starts now and never ends! It is a completely self-paced online course - you decide when you start and when you finish.</div>
              </div>
              <div className="lmsDetailFaqBlock">
                <div className="lmsDetailFaqBlockHeader">How long do I have access to the course?</div>
                <div className="lmsDetailFaqBlockContent">How does lifetime access sound? After enrolling, you have unlimited access to this course for as long as you like - across any and all devices you own.</div>
              </div>
              <div className="lmsDetailFaqBlock">
                <div className="lmsDetailFaqBlockHeader">What if I am unhappy with the course?</div>
                <div className="lmsDetailFaqBlockContent">We're committed to providing the best online learning experience on the Web! If you experience an issue, contact us within 7 days and we'll be happy to help..</div>
              </div>
            </div>
          </div>
          {/*<div className="lmsDetailCallToAction">
            Get Started Now!
            <FlatButton onClick={this.enrollCourse} style={{background:"#6fc13e", color:'#FFFFFF', border:'2px solid #6fc13e', height:'50px', marginLeft:'10px', marginRight:'10px', marginTop:'10px'}}>Enroll</FlatButton>
            </div>*/}
        </main>
        <Dialog
          modal={false}
          open={this.state.videoDialog}
          onRequestClose={this.handleVideo}
          bodyStyle={{overflow:'hidden', background:'transparent'}}
        >
          <iframe title="lecture" width="100%" height="500" src={'https://www.youtube.com/embed/' + this.state.course.courseVideo} frameborder="0"/>
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
