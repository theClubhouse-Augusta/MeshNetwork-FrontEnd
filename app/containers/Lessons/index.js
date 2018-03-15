/*
 *
 * Lessons
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import FlatButton from 'material-ui/Button';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import BackIcon from 'react-icons/lib/fa/arrow-circle-left';
import PreviousIcon from 'react-icons/lib/fa/arrow-left';
import NextIcon from 'react-icons/lib/fa/arrow-right';
import YoutubeIcon from 'react-icons/lib/fa/youtube-play';
import TextIcon from 'react-icons/lib/fa/file-text-o';
import ExamIcon from 'react-icons/lib/fa/question';
import FileIcon from 'react-icons/lib/fa/file-archive-o';

import './style.css';
import './styleM.css';

export default class Lessons extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem('user')),
            student: "",
            feedback: "",
            course: "",
            lessons: [],
            activeLesson: 0,
            activeLecture: 0,
            activeView: "",
            enrolled: 0,
            msg: "",
            snack: false,
            app: this.props.app
        }
    }

    handleRequestClose = () => {
        this.setState({ snack: false, msg: "" });
    };

    showSnack = msg => {
        this.setState({ snack: true, msg: msg });
    };

    componentWillMount() {
        this.getCourse(this.props.match.params.id);
        this.getCourseStudent();
    }

    componentWillReceiveProps(app) {
        this.setState({
            app: app.app
        }, () => {
            this.forceUpdate();
        })
    }

    getCourse = (id) => {
        fetch("https://innovationmesh.com/api/showCourse/" + id + "/" + this.props.match.params.uid, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error) {
                    this.showSnack('Your session has expired.');
                }
                else {
                    let lessons = json.lessons;
                    let lectures = json.lectures;
                    let questions = json.questions;
                    let answers = json.answers;
                    let files = json.files;

                    for (let i = 0; i < lessons.length; i++) {
                        lessons[i].lectures = [];
                        lessons[i].pendingDelete = false;

                        for (let j = 0; j < lectures.length; j++) {
                            lectures[j].lectureFiles = [];
                            lectures[j].lectureQuestions = [];
                            lectures[j].pendingDelete = false;
                            lectures[j].userAnswers = [];
                            // console.log(lectures[j]);

                            for (let k = 0; k < files.length; k++) {
                                if (lectures[j].id === files[k].lectureID) {
                                    lectures[j].lectureFiles.push(files[k]);
                                }
                            }

                            for (let l = 0; l < questions.length; l++) {
                                questions[l].questionAnswers = [];

                                for (let m = 0; m < answers.length; m++) {
                                    if (questions[l].id === answers[m].questionID) {
                                        questions[l].questionAnswers.push(answers[m]);
                                    }
                                }

                                if (lectures[j].id === questions[l].lectureID) {
                                    lectures[j].lectureQuestions.push(questions[l]);
                                }
                            }

                            if (lessons[i].id === lectures[j].lessonID) {
                                lessons[i].lectures.push(lectures[j]);
                            }
                        }
                    }
                    this.setState({
                        course: json.course,
                        lessons: lessons,
                        enrolled: json.enrolled
                    }, () => {
                        this.forceUpdate();
                        if (this.props.match.params.lid) {
                            for (let i = 0; i < this.state.lessons.length; i++) {
                                for (let j = 0; j < this.state.lessons[i].lectures.length; j++) {
                                    if (this.state.lessons[i].lectures[j].id === this.props.match.params.lid) {
                                        this.setState({
                                            activeLesson: i,
                                            activeLecture: j,
                                            activeView: this.state.lessons[i].lectures[j]
                                        })
                                    }
                                }
                            }
                        }
                        else {
                            this.setState({
                                activeLesson: 0,
                                activeLecture: 0,
                                activeView: this.state.lessons[0].lectures[0]
                            })
                        }
                    });
                }
            })
    }

    getCourseStudent = () => {
        fetch('https://innovationmesh.com/api/getCourseStudent/' + this.props.match.params.id + '/' + this.props.match.params.uid, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    student: json.student,
                    feedback: json.feedback
                })
            })
    }

    approveAnswer = (question, i) => {
        fetch('https://innovationmesh.com/api/approveAnswer/' + question.id + '/' + this.props.match.params.uid + '/' + i, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error) {
                    this.showSnack(json.error);
                }
                else if (json.success) {
                    this.showSnack(json.success);
                }
            })
    }

    changeLecture = (i, j, lecture) => {
        this.setState({
            activeLesson: i,
            activeLecture: j,
            activeView: lecture
        })
    }

    completeLecture = () => {
        let lessons = this.state.lessons;
        let data = new FormData();
        data.append('courseID', this.props.match.params.id);
        data.append('lectureID', this.state.activeView.id);
        data.append('answers', JSON.stringify(this.state.lessons[this.state.activeLesson].lectures[this.state.activeLecture].userAnswers));

        fetch("https://innovationmesh.com/api/completeLecture", {
            method: 'POST',
            body: data,
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if (json.error) {
                    this.showSnack('Your session has expired.');
                }
                else if (json.success) {
                    this.showSnack(json.success);
                    lessons[this.state.activeLesson].lectures[this.state.activeLecture].complete = 1;
                    lessons[this.state.activeLesson].lectures[this.state.activeLecture].grade = json.grade.toFixed(0);
                    this.setState({
                        lessons: lessons
                    }, () => {
                        let activeView = this.state.activeView;
                        let activeLecture = this.state.activeLecture;
                        if (this.state.activeLecture < lessons[this.state.activeLesson].lectures.length - 1) {
                            activeView = this.state.lessons[this.state.activeLesson].lectures[this.state.activeLecture + 1];
                            activeLecture = activeLecture + 1;
                        }
                        this.setState({
                            activeLecture: activeLecture,
                            activeView: activeView
                        }, () => {
                            this.forceUpdate();
                        })
                    })
                }
            })
    }

    previousLecture = () => {
        // let lessons = this.state.lessons;
        let activeView = this.state.activeView;
        let activeLecture = this.state.activeLecture;
        if (this.state.activeLecture !== 0) {
            activeView = this.state.lessons[this.state.activeLesson].lectures[this.state.activeLecture - 1];
            activeLecture = activeLecture - 1;
        }
        this.setState({
            activeLecture: activeLecture,
            activeView: activeView
        })
    }

    handleAnswer = (questionID, event) => {
        let lessons = this.state.lessons;
        let answer = { "questionID": questionID, "answerID": event.target.value };
        let answerCheck = 0;
        for (let i = 0; i < lessons[this.state.activeLesson].lectures[this.state.activeLecture].userAnswers.length; i++) {
            if (lessons[this.state.activeLesson].lectures[this.state.activeLecture].userAnswers[i].questionID === questionID) {
                lessons[this.state.activeLesson].lectures[this.state.activeLecture].userAnswers[i].answerID = event.target.value;
                answerCheck = 1;
            }
        }
        if (answerCheck === 0) {
            lessons[this.state.activeLesson].lectures[this.state.activeLecture].userAnswers.push(answer);
        }

        this.setState({
            lessons: lessons
        }, () => {
            this.forceUpdate();
        })

    }

    renderLectureMenu = (lecture, i, j) => {
        let activeStyle = {};
        let complete = <div className="lmsLessonBlockCircle"></div>;
        let grade = "";

        if (this.state.activeView.id === lecture.id) {
            activeStyle.backgroundColor = 'rgba(0, 171, 108, 0.2)'
        }

        if (lecture.complete === 1) {
            complete = <div className="lmsLessonBlockCircleActive"></div>;
        }

        if (lecture.lectureType === "Exam" && lecture.complete === 1) {
            grade = <span style={{ color: "#02BB75", fontSize: "0.9em" }}>{lecture.grade}%</span>;
        }

        return (
            <div className="lmsLessonBlockItem" key={`lmsItem${j}`} onClick={() => this.changeLecture(i, j, lecture)} style={activeStyle}>
                <div className="lmsLessonBlockStatus">
                    {complete}
                </div>
                <div className="lmsLessonBlockTitle">
                    {/*<span style={{marginRight:'10px', color:'#555555'}}>{this.renderIcon(lecture.lectureType)}</span>*/}
                    {lecture.lectureName}
                    {grade}
                </div>
            </div>
        )
    }

    renderEnroll = () => {
        if (this.state.token) {
            return (
                <div className="lmsLessonMainEnroll">
                    Lecture Contents Locked
          <Link to={'/LMS/Enroll/' + this.props.match.params.id}><FlatButton style={{ color: "#FFFFFF", height: '50px', marginLeft: '10px', marginRight: '10px', marginTop: '10px', background: "#6fc13e" }} >Enroll Now</FlatButton></Link>
                </div>
            )
        }
        else {
            return (
                <div className="lmsLessonMainEnroll">
                    Lecture Contents Locked
          <Link to={'/spaces'}><FlatButton style={{ color: "#FFFFFF", background: "#6fc13e", height: '50px', marginLeft: '10px', marginRight: '10px', marginTop: '10px' }} >Enroll Now</FlatButton></Link>
                </div>
            )
        }
    }

    renderCorrect = (question, answer, i, j) => {

        let correctStyle = {
            background: '#FFFFFF',
            paddingLeft: '5px',
            paddingRight: '5px'
        }

        if (answer.isCorrect === 1 && answer.solCorrect === 1) {
            correctStyle.background = '#98FB98';
        } else if (answer.solCorrect === 0) {
            correctStyle.background = 'rgba(220, 20, 60, 0.4)';
        } else if (answer.isCorrect === 1) {
            correctStyle.background = '#98FB98';
        }

        if (this.state.activeView.complete == 1) {
            return (
                <div key={`lmsQuestionAnswer${j}`} style={correctStyle}>
                    <input type="radio" name={'question-' + i} value={answer.id} onChange={(event) => this.handleAnswer(question.id, event)} checked={answer.solution} disabled={true} />
                    <span style={{ marginLeft: '10px', width: '90%' }}>{answer.answerContent}</span>
                </div>
            )
        } else {
            return (
                <div key={`lmsQuestionAnswer${j}`}>
                    <input type="radio" name={'question-' + i} value={answer.id} onChange={(event) => this.handleAnswer(question.id, event)} />
                    <span style={{ marginLeft: '10px', width: '90%' }}>{answer.answerContent}</span>
                </div>
            )
        }
    }

    renderOpen = (question, i) => {

        let correctStyle = {
            background: '#FFFFFF',
            marginLeft: '55px',
            width: '85%'
        }

        let pendingReview = "";

        if (question.solCorrect === 1) {
            correctStyle.background = '#98FB98';
        } else if (question.solCorrect === 0) {
            correctStyle.background = 'rgba(220, 20, 60, 0.4)';
        } else if (question.solCorrect === 2) {
            correctStyle.background = '#FFFACD';
            pendingReview = <span style={{ fontSize: '0.8em', color: '#444444' }}>Pending Review</span>;
        }

        if (this.state.activeView.complete == 1) {
            return (
                <div style={correctStyle}>
                    <TextField placeholder="Your Answer" fullWidth={true} multiLine={true} rowsMax={3} name={'question-' + i} value={question.solution} disabled={true} />
                    {pendingReview}
                    {this.renderApprove(question)}
                </div>
            )
        } else {
            return (
                <div style={{ marginLeft: '55px', width: '85%' }}>
                    <TextField placeholder="Your Answer" fullWidth={true} multiLine={true} rowsMax={3} name={'question-' + i} value={question.solution} />
                </div>
            );
        }
    }

    renderAnswers = (question, i) => {
        if (question.questionType === 'multiple') {
            return (
                <div style={{ marginLeft: '70px', width: '85%' }}>
                    {question.questionAnswers.map((answer, j) => (
                        this.renderCorrect(question, answer, i, j)
                    ))}
                </div>
            )
        }
        else if (question.questionType === 'open') {
            return (
                this.renderOpen(question, i)
            )
        }
    }

    renderCourseMain = () => {
        if (this.state.enrolled === 0) {
            return (
                <div className="lmsLessonMainContent">
                    {this.renderEnroll()}
                </div>
            )
        }
        else if (this.state.activeView.lectureType === "Text") {
            return (
                <div className="lmsLessonMainContent">
                    <div dangerouslySetInnerHTML={{ __html: this.state.activeView.lectureContent }} />
                </div>
            )
        }
        else if (this.state.activeView.lectureType === "Video") {
            return (
                <div className="lmsLessonMainContent">
                    <iframe title="lesson" width="100%" height="800px" src={'https://www.youtube.com/embed/' + this.state.activeView.lectureVideo} frameborder="0" />
                </div>
            )
        }
        else if (this.state.activeView.lectureType === "File") {
            return (
                <div className="lmsLessonMainContent">
                    {this.state.activeView.lectureFiles.map((file, index) => (
                        <a href={file.fileData} key={`fileData${index}`} style={{ textDecoration: 'none' }} target="_blank"><div className="lmsNewFileBlock" ><span></span> {file.fileName} <span></span></div></a>
                    ))}
                </div>
            )
        }
        else if (this.state.activeView.lectureType === "Exam") {
            return (
                <div className="lmsLessonMainContent">
                    {this.state.activeView.lectureQuestions.map((question, i) => (
                        <div className="lmsNewLectureQuestionBlock" key={`questionBlock${i}`} style={{ borderBottom: '1px solid #EEEEEE', paddingTop: '15px', paddingBottom: '15px' }}>
                            <div className="lmsNewLectureQuestionContent">
                                <span className="lmsNewLectureQuestionNum">{i + 1}</span>
                                <div>{question.questionContent}</div>
                            </div>
                            <span style={{ display: 'flex', flexDirection: 'row' }}>
                                {this.renderAnswers(question, i)}
                            </span>
                        </div>
                    ))}
                    <FlatButton onClick={this.completeLecture} style={{ color: "#FFFFFF", background: "#6fc13e", marginTop: "15px" }}>Submit Exam</FlatButton>
                </div>
            )
        }
    }

    renderIcon = (type) => {
        if (type === "Video") { return (<YoutubeIcon />) }
        else if (type === "Exam") { return (<ExamIcon />) }
        else if (type === "Text") { return (<TextIcon />) }
        else if (type === "File") { return (<FileIcon />) }
    }

    renderStudent = () => {
        if (this.state.user.id === this.state.course.userID) {
            return (
                <div>
                    <div className="lmsSingleLessonImageContainer">
                        <img alt="" className="lmsSingleLessonImage" src={this.state.student.avatar} />
                    </div>
                    <div className="lmsLessonColumnOneTitle">{this.state.student.name}</div>
                    <div className="lmsLessonBlock">
                        <div className="lmsLessonBlockItem">
                            <div className="lmsLessonBlockTitle">{this.state.student.email}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderGrade = () => {
        if (this.state.user.id === this.state.course.userID) {
            return (
                <div className="lmsLectureGrade">{this.state.activeView.grade} / 100</div>
            )
        }
    }

    renderApprove = (question) => {
        if (this.state.user.id === this.state.course.userID) {
            if (question.solCorrect === 2) {
                return (
                    <div className="correctOptions">
                        <FlatButton onClick={() => this.approveAnswer(question, 1)} style={{ background: '#6fc13e', color: '#FFFFFF' }}>Approve</FlatButton>
                        <FlatButton onClick={() => this.approveAnswer(question, 0)}>Deny</FlatButton>
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div className="container">
                <Helmet title="Lessons" meta={[{ name: 'description', content: 'Description of Lessons' }]} />

                <header>

                </header>

                <main className="lmsLessonMain">
                    <div className="lmsLessonColumnOne">
                        <div className="lmsLessonColumnOneHeader">
                            <BackIcon color="#FFFFFF" style={{ padding: '5px' }} size={30} onClick={this.props.history.goBack} />
                        </div>
                        <div className="lmsLessonColumnOneContent">
                            {this.renderStudent()}
                            <div className="lmsLessonColumnOneTitle">{this.state.course.courseName}</div>
                            <div className="lmsLessonList">
                                {this.state.lessons.map((lesson, i) => (
                                    <div className="lmsLessonBlock" key={`lmsLBlock${i}`}>
                                        <div className="lmsLessonBlockHeader">{lesson.lessonName}</div>
                                        {lesson.lectures.map((lecture, j) => (
                                            this.renderLectureMenu(lecture, i, j)
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lmsLessonColumnTwo">
                        <div className="lmsLessonColumnTwoHeader">
                            <div className="lmsLessonPreviousButton">
                                <FlatButton onClick={this.previousLecture} icon={<PreviousIcon color="#FFFFFF" />} style={{ width: '100%', borderRadius: 'none', height: '50px', color: "#FFFFFF" }}>Previous Lesson</FlatButton>
                            </div>
                            <div className="lmsLessonNextButton">
                                <FlatButton onClick={this.completeLecture} icon={<NextIcon color="#FFFFFF" />} style={{ width: '100%', borderRadius: 'none', height: '50px', color: "#FFFFFF", background: "#6fc13e" }}>Complete and Continue</FlatButton>
                            </div>
                        </div>
                        <div className="lmsLessonColumnTwoContent">
                            {this.renderGrade()}
                            <div className="lmsLessonColumnTwoHeading">{this.state.activeView.lectureName}</div>
                            {this.renderCourseMain()}
                        </div>
                    </div>

                </main>

                <footer>

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
