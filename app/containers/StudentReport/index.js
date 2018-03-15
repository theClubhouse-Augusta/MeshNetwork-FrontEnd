/*
 *
 * StudentReport
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';

import BackIcon from 'react-icons/lib/fa/arrow-circle-left';

import './style.css';
import './styleM.css';

export default class StudentReport extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            token: localStorage.getItem('token'),
            student: '',
            lectures: [],
            feedback: '',
            activeView: ''
        }
    }

    componentWillMount() {
        this.getCourseStudent();
    }

    getCourseStudent = () => {
        fetch('https://innovationmesh.com/api/getCourseStudent/' + this.props.match.params.cid + '/' + this.props.match.params.uid, {
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
                    course: json.course,
                    student: json.student,
                    lectures: json.lectures,
                    feedback: json.feedback
                })
            })
    }

    changeMenu = (i) => {
        let lectures = this.state.lectures;
        let activeLecture = lectures[i];

        this.setState({
            activeView: activeLecture
        })
    }

    renderAnswers = (question, i) => {
        if (question.questionType === 'multiple') {
            return (
                <div style={{ marginLeft: '70px', width: '85%' }}>
                    {question.questionAnswers.map((answer, j) => (
                        <div key={`lmsQuestionAnswer${j}`}>
                            <input type="radio" name={'question-' + i} value={answer.id} onChange={(event) => this.handleAnswer(question.id, event)} />
                            <span style={{ marginLeft: '10px', width: '90%' }}>{answer.answerContent}</span>
                        </div>
                    ))}
                </div>
            )
        }
        else if (question.questionType === 'open') {
            return (
                <div style={{ marginLeft: '55px', width: '85%' }}>
                    <TextField placeholder="Your Answer" fullWidth={true} multiLine={true} rowsMax={3} name={'question-' + i} />
                </div>
            )
        }
    }

    renderCourseMain = () => {
        if (this.state.activeView.lectureType === "Text") {
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
                        <a href={file.fileData} key={`fileData${index}`} style={{ textDecoration: 'none' }} target="_blank"><div className="lmsNewFileBlock" ><span></span> {file.fileData} <span></span></div></a>
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
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container">
                <Helmet title="StudentReport" meta={[{ name: 'description', content: 'Description of StudentReport' }]} />


                <header>

                </header>

                <main className="lmsLessonMain">
                    <div className="lmsLessonColumnOne">
                        <div className="lmsLessonColumnOneHeader">
                            <Link to="/LMS/MyLMS"><BackIcon color="#FFFFFF" style={{ padding: '5px' }} size={30} /></Link>
                        </div>
                        <div className="lmsLessonColumnOneContent">
                            <div className="lmsSingleLessonImageContainer">
                                <img alt="" className="lmsSingleLessonImage" src={this.state.student.avatar} />
                            </div>
                            <div className="lmsLessonColumnOneTitle">{this.state.student.name}</div>
                            <div className="lmsLessonBlock">
                                <div className="lmsLessonBlockItem">
                                    <div className="lmsLessonBlockTitle">{this.state.student.email}</div>
                                </div>
                                <div className="lmsLessonBlockItem">
                                    <div className="lmsLessonBlockTitle">{this.state.course.courseName}</div>
                                </div>
                            </div>
                            <div className="lmsLessonColumnOneTitle"></div>
                            <div className="lmsLessonList">
                                {this.state.lectures.map((lecture, i) => (
                                    <div className="lmsLessonBlockItem" onClick={() => this.changeMenu(i)}>
                                        <div className="lmsLessonBlockTitle">{lecture.lectureName}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lmsLessonColumnTwo">
                        <div className="lmsLessonColumnTwoHeader">

                        </div>
                        <div className="lmsLessonColumnTwoContent">
                            <div className="lmsLectureGrade">{this.state.activeView.grade} / 100</div>
                            <div className="lmsLessonColumnTwoHeading">{this.state.activeView.lectureName}</div>
                            {this.renderCourseMain()}
                        </div>
                    </div>

                </main>

                <footer>

                </footer>

            </div>
        );
    }
}