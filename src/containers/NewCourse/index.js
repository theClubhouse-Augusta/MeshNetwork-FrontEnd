import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import FlatButton from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { LinearProgress } from 'material-ui/Progress';
import SelectField from 'material-ui/Select';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Helmet from 'react-helmet';
import BackIcon from 'react-icons/lib/fa/arrow-circle-left';
import CloseIcon from 'react-icons/lib/fa/close';
import AddIcon from 'react-icons/lib/fa/plus-square-o';
import { Link } from 'react-router-dom';
import './style.css';
import './styleM.css';

export default class NewCourse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      snack: false,
      msg: "",
      categories: [],
      lessons: [],
      activeLesson: -1,
      activeLecture: 0,
      activeView: {},
      activeLectureType: "Text",
      courseName: "",
      courseSummary: "",
      courseInformation: EditorState.createEmpty(),
      courseInstructorName: "",
      courseInstructorInfo: "",
      courseInstructorAvatar: "",
      courseInstructorAvatarPreview: "",
      courseImage: "",
      courseImagePreview: "",
      coursePrice: "",
      courseStatus: "",
      isSaving: false,
      courseCategory: 0,
    }
  };
  componentDidMount() {
    this.getCategories();
    this.getCourse(this.props.match.params.id);
  };
  handleRequestClose = () => {
    this.setState({
      snack: false,
      msg: ""
    });
  };
  showSnack = msg => {
    this.setState({
      snack: true,
      msg: msg
    });
  };
  getCourse = id => {
    fetch("http://localhost:8000/api/editCourse/" + id, {
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        lessons,
        lectures,
        questions,
        answers,
        files,
        error,
        course
      }) => {
        if (error) {
          this.showSnack('Your session has expired');
        } else {
          for (let i = 0; i < lessons.length; i++) {
            lessons[i].lectures = [];
            lessons[i].pendingDelete = false;
            for (let j = 0; j < lectures.length; j++) {
              lectures[j].lectureFiles = [];
              lectures[j].lectureQuestions = [];
              lectures[j].pendingDelete = false;
              for (let k = 0; k < files.length; k++) {
                files[k].isLoading = false;
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
            courseName: course.courseName,
            courseSummary: course.courseSummary,
            courseCategory: course.courseCategory,
            courseInformation: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(course.courseInformation))),
            courseInstructorName: course.courseInstructorName,
            courseInstructorInfo: course.courseInstructorInfo,
            courseInstructorAvatarPreview: course.courseInstructorAvatar,
            courseImagePreview: course.courseImage,
            coursePrice: course.coursePrice,
            courseStatus: course.courseStatus,
            lessons,
          });
        }
      })
  };
  getCategories = () => {
    fetch("http://localhost:8000/api/getSubjects", {
      method: 'GET'
    })
      .then(response => response.json())
      .then(({ categories }) => {
        this.setState({ categories });
      })
  };
  handleCourseName = event => {
    console.log('handleCourseName');
    this.setState({ courseName: event.target.value });
  };
  handleCourseSummary = event => {
    console.log('handleCourseSummary');
    this.setState({ courseSummary: event.target.value })
  };
  handleCoursePrice = event => {
    console.log('handleCoursePrice');
    this.setState({ coursePrice: event.target.value });
  };
  handleCourseCategory = event => {
    console.log('handleCourseCategory');
    this.setState({ courseCategory: event.target.value });
  }
  handleCourseInformation = editorState => {
    console.log('handleCourseInformation');
    this.setState({
      courseInformation: editorState,
      editorState
    });
  };
  handleCourseInstructorName = event => {
    console.log('handleCourseInstructorName');
    this.setState({ courseInstructorName: event.target.value });
  };
  handleCourseInstructorInfo = event => {
    console.log('handleCourseInstructorInfo');
    this.setState({ courseInstructorInfo: event.target.value });
  };
  handleLectureName = (i, j, event) => {
    console.log('handleLectureName');
    let lessons = [...this.state.lessons];
    lessons[i].lectures[j].lectureName = event.target.value;
    this.setState(() => ({ lessons }));
  };
  handleLectureContent = editorState => {
    console.log('handleLectureContent');
    let activeView = { ...this.state.activeView };
    let lessons = this.state.lessons;
    activeView.lectureContent = editorState;
    lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureContent = editorState;
    this.setState({
      activeView: activeView,
      lessons: lessons,
      editorState: editorState
    })
  };
  handleLectureType = (event, index, value) => {
    console.log('handleLectureType');
    let activeView = { ...this.state.activeView };
    let lessons = [...this.state.lessons];
    activeView.lectureType = event.target.value;
    lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureType = event.target.value;
    this.setState({
      activeView,
      lessons,
      activeLectureType: event.target.value
    }, () => {
      this.updateLecture(this.state.activeLesson, this.state.activeLecture);
    });
  };
  handleLectureVideo = (event, index, value) => {
    console.log('handleLectureVideo');
    let activeView = { ...this.state.activeView };
    let lessons = [...this.state.lessons];
    activeView.lectureVideo = event.target.value;
    lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureVideo = event.target.value;
    this.setState({
      activeView: activeView,
      lessons: lessons,
    }, () => {
      this.updateLecture(this.state.activeLesson, this.state.activeLecture);
    });
  };
  handleCourseImage = (event) => {
    console.log('handleCourseImage');
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        courseImage: file,
        courseImagePreview: reader.result
      }, () => {
        this.updateCourseImage();
      });
    };
    reader.readAsDataURL(file);
  };
  handleCourseInstructorAvatar = (event) => {
    console.log('handleCourseInstructorAvatar');
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        courseInstructorAvatar: file,
        courseInstructorAvatarPreview: reader.result
      }, () => {
        this.updateCourseInstructorAvatar();
      });
    };
    reader.readAsDataURL(file);
  };
  handleLessonName = (index, event) => {
    console.log('handleLessonName');
    let lessons = [...this.state.lessons];
    lessons[index].lessonName = event.target.value
    this.setState({ lessons });
  };
  handleLectureFile = (event) => {
    console.log('handleLectureFile');
    event.preventDefault();
    let reader = new FileReader();
    let files = event.target.files;
    let lessons = [...this.state.lessons];
    if (files.length > 5) {
      this.showSnack('Please Select 5 or Less Files');
    } else {
      for (let i = 0; i < files.length; i++) {
        if (lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureFiles.length >= 5) {
          this.showSnack('Please Select 5 or Less Files');
        } else {
          let fileData = { "isLoading": true, "fileData": files[i], "id": 0 };
          lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureFiles.push(fileData);
          reader.onloadend = () => {
            this.setState({ lessons },
              () => {
                this.storeFile(fileData, lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureFiles.length - 1);
              });
          };
          reader.readAsDataURL(files[i]);
        }
      }
    }
  };
  createLecture = (index) => {
    console.log('createLecture');
    let lessons = [...this.state.lessons];
    let lecture = { "id": 0, "lectureName": "Lecture Title", "lectureContent": "", "lectureType": "Text", "lectureFiles": [], "lectureQuestions": [], "pendingDelete": false };
    lessons[index].lectures.push(lecture);
    this.setState({ lessons });
  };
  storeQuestion = (type) => {
    console.log('storeQuestion');
    let data = new FormData();
    let lessons = [...this.state.lessons];
    if (lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions.length < 50) {
      data.append('lectureID', lessons[this.state.activeLesson].lectures[this.state.activeLecture].id);
      data.append('questionContent', "");
      data.append('questionType', type);
      fetch("http://localhost:8000/api/storeQuestion/", {
        method: 'POST',
        body: data,
        headers: { 'Authorization': 'Bearer ' + this.state.token }
      })
        .then(response => response.json())
        .then(({
          error,
          success,
        }) => {
          if (error) {
            this.showSnack('Your session has expired.');
          } else if (success) {
            let question = { "id": success, "questionContent": "", "questionAnswers": [], "questionType": type };
            lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions.push(question);
            this.setState({ lessons });
            this.showSnack("Question Added.")
          }
        });
    } else {
      this.showSnack("No More Than 50 Questions per Exam.")
    }
  };
  handleQuestion = (i, event) => {
    console.log('handleQuestion');
    let lessons = [...this.state.lessons];
    lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionContent = event.target.value;
    this.setState({ lessons });
  };
  updateQuestion = (i, event) => {
    let data = new FormData();
    let lessons = [...this.state.lessons]
    let id = lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].id
    data.append('questionContent', event.target.value);
    fetch("http://localhost:8000/api/updateQuestion/" + id, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
        question,
      }) => {
        if (error) {
          this.showSnack('Your session has expired.');
        } else if (question) {
          lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionContent = question.questionContent;
          this.setState({ lessons });
        }
      });
  };
  storeAnswer = (i) => {
    console.log('storeAnswer');
    let data = new FormData();
    let lessons = [...this.state.lessons];
    let questionID = lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].id;
    if (lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers.length < 6) {
      data.append('questionID', questionID);
      data.append('answerContent', "");
      data.append('isCorrect', false);
      fetch("http://localhost:8000/api/storeAnswer", {
        method: 'POST',
        body: data,
        headers: { 'Authorization': 'Bearer ' + this.state.token }
      })
        .then(response => response.json())
        .then(({
          error,
          success
        }) => {
          if (error) {
            this.showSnack('Your session has expired.');
          } else if (success) {
            let answer = { "id": success, "answerContent": "", "isCorrect": false };
            lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers.push(answer);
            this.setState({ lessons });
          }
        });
    } else {
      this.showSnack("Only 6 Maximum Answers")
    }
  };
  handleAnswer = (i, j, event) => {
    console.log('handleAnswer');
    let lessons = [...this.state.lessons];
    lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers[j].answerContent = event.target.value;
    this.setState({ lessons });
  };
  updateAnswer = (i, j, event) => {
    console.log('updateAnswer');
    let data = new FormData();
    let lessons = [...this.state.lessons];
    let id = lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers[j].id;
    data.append('answerContent', event.target.value);
    fetch("http://localhost:8000/api/updateAnswer/" + id, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
        answer
      }) => {
        if (error) {
          this.showSnack('Your session has expired.');
        } else if (answer) {
          lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers[j].answerContent = answer.answerContent;
          this.setState({ lessons: lessons });
        }
      });
  };
  // setCorrect = (i, j, event) => { // }
  updateCorrect = (i, j, id) => {
    console.log('updateCorrect');
    let lessons = [...this.state.lessons];
    for (let x = 0; x < lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers.length; x++) {
      if (lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers[x].isCorrect === true) {
        lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers[x].isCorrect = false;
      }
    }
    let questionID = lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].id;
    lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers[j].isCorrect = true;
    fetch(`http://localhost:8000/api/updateCorrectAnswer/${this.props.match.params.id}/${questionID}/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.state.token
      }
    })
      .then(response => response.json())
      .then((json) => {
        this.showSnack('Answer Set');
      })

    this.setState({ lessons });
  };
  updateCourse = courseStatus => {
    console.log('updateCourse');
    if (courseStatus === 'Published') {
      this.setState({ isSaving: true });
    }
    let data = new FormData();
    let coursePrice = this.state.coursePrice;
    if (coursePrice === null || coursePrice === undefined || coursePrice === "") {
      coursePrice = 0;
    }
    let courseCategory = this.state.courseCategory;
    if (courseCategory === undefined) {
      courseCategory = 0;
    }
    data.append('courseName', this.state.courseName);
    data.append('courseSummary', this.state.courseSummary);
    data.append('courseCategory', courseCategory);
    data.append('courseInformation', draftToHtml(convertToRaw(this.state.courseInformation.getCurrentContent())));
    data.append('courseInstructorName', this.state.courseInstructorName);
    data.append('courseInstructorInfo', this.state.courseInstructorInfo);
    data.append('coursePrice', coursePrice);
    data.append('courseStatus', courseStatus);
    fetch(`http://localhost:8000/api/updateCourse/${this.props.match.params.id}`, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
        success,
      }) => {
        if (error) {
          this.showSnack('Your session has expired.');
        } else {
          this.setState({ isSaving: false })
          if (success && courseStatus === "Published") {
            this.showSnack('Course Published.');
          }
        }
      });
  };
  updateCourseImage = () => {
    console.log('updateCourseImage');
    this.setState({ isSaving: true })
    let data = new FormData();
    data.append('courseImage', this.state.courseImage);
    fetch(`http://localhost:8000/api/updateCourseImage/${this.props.match.params.id}`, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
      }) => {
        if (error) {
          this.showSnack('Your session has expired.');
        } else {
          this.setState({ isSaving: false });
        }
      });
  };
  updateCourseInstructorAvatar = () => {
    console.log('updateCourseInstructorAvatar');
    this.setState({ isSaving: true });
    let data = new FormData();
    data.append('courseInstructorAvatar', this.state.courseInstructorAvatar);
    fetch(`http://localhost:8000/api/updateCourseInstructorAvatar/${this.props.match.params.id}`, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
      }) => {
        if (error) {
          this.showSnack('Your session has expired');
        } else {
          this.setState({ isSaving: false });
        }
      });
  };
  storeLesson = () => {
    console.log('storeLesson');
    let data = new FormData();
    let lessons = [...this.state.lessons];
    data.append('courseID', this.props.match.params.id);
    data.append('lessonName', "Lesson Title");
    fetch(`http://localhost:8000/api/storeLesson`, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
        success,
      }) => {
        if (error) {
          this.showSnack('Your session has expired.');
        } else if (success) {
          let newLesson = {
            id: success,
            lessonName: "Lesson Title",
            lectures: [],
            pendingDelete: false,
          };
          lessons.push(newLesson);
          this.setState({ lessons });
          this.showSnack("Lesson Added.")
        };
      });
  };
  updateLesson = (id, lessonName) => {
    console.log('updateLesson');
    let data = new FormData();
    data.append('lessonName', lessonName);
    fetch(`http://localhost:8000/api/updateLesson/${id}`, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
      }) => {
        if (error) {
          this.showSnack('Your session has expired.');
        } else {
          this.showSnack('Lesson Updated');
        }
      });
  };
  updateLecture = (currentLesson, currentLecture) => {
    console.log('updateLecture');
    let lessons = [...this.state.lessons];
    let id = lessons[currentLesson].lectures[currentLecture].id;
    console.log('id', id);
    let data = new FormData();
    data.append('lectureName', lessons[currentLesson].lectures[currentLecture].lectureName);
    if (lessons[currentLesson].lectures[currentLecture].lectureContent) {
      if (lessons[currentLesson].lectures[currentLecture].lectureContent.getCurrentContent) {
        data.append('lectureContent', draftToHtml(convertToRaw(lessons[currentLesson].lectures[currentLecture].lectureContent.getCurrentContent())));
      }
    }
    data.append('lectureType', lessons[currentLesson].lectures[currentLecture].lectureType);
    data.append('lectureVideo', lessons[currentLesson].lectures[currentLecture].lectureVideo);
    fetch(`http://localhost:8000/api/updateLecture/${id}`, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({ error }) => {
        if (error) {
          this.showSnack('Your session has expired.');
        }
      });
  };
  storeLecture = i => {
    console.log('storeLecture');
    let data = new FormData();
    let lessons = [...this.state.lessons];
    data.append('lessonID', lessons[i].id);
    data.append('lectureName', "Lecture Title");
    data.append('lectureContent', draftToHtml(convertToRaw(EditorState.createEmpty().getCurrentContent())));
    data.append('lectureType', "Text");
    data.append('lectureVideo', "");
    fetch(`http://localhost:8000/api/storeLecture`, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
        success
      }) => {
        if (error) {
          this.showSnack('Your session has expired.');
        } else if (success) {
          let lecture = {
            id: success,
            lectureName: "Lecture Title",
            lectureContent: EditorState.createEmpty(),
            lectureType: "Text",
            lectureVideo: "",
            lectureFiles: [],
            lectureQuestions: [],
            pendingDelete: false
          };
          lessons[i].lectures.push(lecture);
          this.setState({ lessons });
          this.showSnack("Lecture Added.")
        }
      });
  };
  storeFile = (file, index) => {
    console.log('storeFile');
    let lessons = [...this.state.lessons];
    let data = new FormData();
    data.append('lectureID', this.state.activeView.id);
    data.append('fileContent', file.fileData);
    fetch(`http://localhost:8000/api/storeFiles`, {
      method: 'POST',
      body: data,
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
        success,
      }) => {
        if (error) {
          this.showSnack(error);
        }
        else if (success) {
          lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureFiles[index].isLoading = false;
          lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureFiles[index].id = success;
          this.setState({ lessons });
        }
      });
  };
  deleteLesson = (id, i) => {
    console.log('deleteLesson');
    let lessons = [...this.state.lessons];
    fetch(`http://localhost:8000/api/deleteLesson/${id}`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({
        error,
      }) => {
        if (error) {
          this.showSnack('Your session has expired');
        } else {
          lessons.splice(i, 1);
          this.setState({ lessons });
        }
      });
  };
  deleteLecture = (id, i, j) => {
    console.log('deleteLecture');
    let lessons = this.state.lessons;
    fetch(`http://localhost:8000/api/deleteLecture/${id}`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({ error }) => {
        if (error) {
          this.showSnack('Your session has expired');
        } else {
          lessons[i].lectures.splice(j, 1);
          this.setState({ lessons });
        }
      });
  };
  deleteQuestion = (id, i) => {
    console.log('deleteQuestion');
    let lessons = [...this.state.lessons];
    fetch(`http://localhost:8000/api/deleteQuestion/${id}`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({ error }) => {
        if (error) {
          this.showSnack('Your session has expired.');
        } else {
          lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions.splice(i, 1);
          this.setState({ lessons });
        }
      });
  };
  deleteAnswer = (id, i, j) => {
    console.log('deleteAnswer');
    let lessons = [...this.state.lessons];
    fetch(`http://localhost:8000/api/deleteAnswer/${id}`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({ error }) => {
        if (error) {
          this.showSnack('Your session has expired');
        } else {
          lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureQuestions[i].questionAnswers.splice(j, 1);
          this.setState({ lessons });
        }
      });
  };
  deleteFile = (id, i) => {
    console.log('deleteFile');
    let lessons = [...this.state.lessons];
    fetch(`http://localhost:8000/api/deleteFile/${id}`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + this.state.token }
    })
      .then(response => response.json())
      .then(({ error }) => {
        if (error) {
          this.showSnack('Your session has expired');
        } else {
          lessons[this.state.activeLesson].lectures[this.state.activeLecture].lectureFiles.splice(i, 1);
          this.setState({ lessons });
        }
      });
  };
  confirmLessonDelete = i => {
    console.log('confirmLessonDelete');
    let lessons = [...this.state.lessons];
    lessons[i].pendingDelete = !lessons[i].pendingDelete;
    this.setState({ lessons });
  };
  confirmLectureDelete = (currentLesson, currentLecture) => {
    console.log('confirmLectureDelete');
    let lessons = [...this.state.lessons];
    lessons[currentLesson].lectures[currentLecture].pendingDelete = !lessons[currentLesson].lectures[currentLecture].pendingDelete;
    this.setState({ lessons });
  };
  changeMenu = (currentLesson, currentLecture = -1) => {
    const { activeLesson, activeLecture } = this.state;
    console.log('confirmLectureDelete');
    const duplicate = ((activeLesson === currentLesson) && (activeLecture === currentLecture));
    if (!duplicate) {
      let lessons = [...this.state.lessons];
      console.log('less', lessons);
      if (currentLecture !== -1 && lessons[currentLesson].lectures[currentLecture].lectureContent) {
        if (lessons[currentLesson].lectures[currentLecture].lectureContent.getCurrentContent) {
          lessons[currentLesson].lectures[currentLecture].lectureContent = draftToHtml(convertToRaw(lessons[currentLesson].lectures[currentLecture].lectureContent.getCurrentContent()));
        }
      }
      this.setState({
        activeLesson: currentLesson,
        activeLecture: currentLecture,
        lessons,
      }, () => {
        if (currentLecture !== -1) {
          const content = lessons[currentLesson].lectures[currentLecture].lectureContent;
          if (content !== null) {
            let contentBlock = convertFromHTML(content);
            if (contentBlock.contentBlocks !== null) {
              lessons[currentLesson].lectures[currentLecture].lectureContent = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(lessons[currentLesson].lectures[currentLecture].lectureContent)));
              let activeView = lessons[currentLesson].lectures[currentLecture];
              this.setState({
                lessons,
                activeView,
                activeLectureType: activeView.lectureType
              });
            }
          }
        } else {
          this.updateCourse(this.state.courseStatus);
        }
      });
    }
  };
  renderMenu = (currentLesson, currentLecture, lecture) => {
    console.log('renderMenu');
    if (currentLesson === this.state.activeLesson) {
      console.log('one');
      if (currentLecture === this.state.activeLecture) {
        console.log('two');
        return (
          <div className="lmsNewBlockItemContainer" key={`lmsLecturecontain${currentLecture}`}>
            <div
              className="lmsNewBlockItem"
              onClick={() => this.changeMenu(currentLesson, currentLecture)}
              style={{ borderLeft: '5px solid  #6fc13e' }}
            >
              <input
                className="lmsNewBlockItemInput"
                value={lecture.lectureName}
                onChange={(event) => this.handleLectureName(currentLesson, currentLecture, event)}
                onBlur={() => this.updateLecture(currentLesson, currentLecture)}
              />
              <div className="lmsNewLessonCloseIcon">
                <CloseIcon
                  style={{ width: '20px', height: '20px', color: '#888888', cursor: 'pointer' }}
                  onClick={() => this.confirmLectureDelete(currentLesson, currentLecture)}
                />
              </div>
            </div>
            {this.renderLectureDelete(lecture.id, currentLesson, currentLecture)}
          </div>
        );
      } else {

        console.log('three');
        return (
          <div className="lmsNewBlockItemContainer" key={`lmsLectureRenderMenu${currentLecture}`}>
            <div
              className="lmsNewBlockItem"
              onClick={() => this.changeMenu(currentLesson, currentLecture)}
            >
              <input
                className="lmsNewBlockItemInput"
                value={lecture.lectureName}
                onChange={(event) => this.handleLectureName(currentLesson, currentLecture, event)}
                onBlur={() => this.updateLecture(currentLesson, currentLecture)}
              />
              <div className="lmsNewLessonCloseIcon">
                <CloseIcon
                  style={{ width: '20px', height: '20px', color: '#888888', cursor: 'pointer' }}
                  onClick={() => this.confirmLectureDelete(currentLesson, currentLecture)}
                />
              </div>
            </div>
            {this.renderLectureDelete(lecture.id, currentLesson, currentLecture)}
          </div>
        );
      }
    } else {
      console.log('four');
      return (
        <div className="lmsNewBlockItemContainer" key={`lmsRenderCon${currentLecture}`}>
          <div
            className="lmsNewBlockItem"
            onClick={() => this.changeMenu(currentLesson, currentLecture)}
          >
            <input
              className="lmsNewBlockItemInput"
              value={lecture.lectureName}
              onChange={(event) => this.handleLectureName(currentLesson, currentLecture, event)}
              onBlur={() => this.updateLecture(currentLesson, currentLecture)}
            />
            <div className="lmsNewLessonCloseIcon">
              <CloseIcon
                style={{ width: '20px', height: '20px', color: '#888888', cursor: 'pointer' }}
                onClick={() => this.confirmLectureDelete(currentLesson, currentLecture)}
              />
            </div>
          </div>
          {this.renderLectureDelete(lecture.id, currentLesson, currentLecture)}
        </div>
      );
    }
  };
  renderDiscussionMenu = () => {
    console.log('renderDiscussionMenu');
    if (this.state.activeLesson === -1) {
      return (
        <div className="lmsLessonBlock">
          <div
            className="lmsLessonBlockItem"
            style={{ borderLeft: '5px solid #6fc13e' }}
            onClick={() => this.changeMenu(-1, -1)}
          >
            <div className="lmsLessonBlockTitle">Course Description</div>
          </div>
          <div
            className="lmsLessonBlockItem"
            onClick={() => this.changeMenu(-2, -1)}
          >
            <div className="lmsLessonBlockTitle">Instructor</div>
          </div>
        </div>
      );
    } else if (this.state.activeLesson === -2) {
      return (
        <div className="lmsLessonBlock">
          <div className="lmsLessonBlockItem" onClick={() => this.changeMenu(-1, -1)}>
            <div className="lmsLessonBlockTitle">Course Description</div>
          </div>
          <div
            className="lmsLessonBlockItem"
            style={{ borderLeft: '5px solid #6fc13e' }}
            onClick={() => this.changeMenu(-2, -1)}
          >
            <div className="lmsLessonBlockTitle">Instructor</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="lmsLessonBlock">
          <div className="lmsLessonBlockItem" onClick={() => this.changeMenu(-1, -1)}>
            <div className="lmsLessonBlockTitle">Course Description</div>
          </div>
          <div className="lmsLessonBlockItem" onClick={() => this.changeMenu(-2, -1)}>
            <div className="lmsLessonBlockTitle">Instructor</div>
          </div>
        </div>
      );
    }
  };
  renderPromoImageText = () => {
    console.log('renderPromoImageText');
    if (this.state.courseImagePreview === "" || this.state.courseImagePreview === undefined || this.state.courseImagePreview === null) {
      return (
        <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          Promo Image
          <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>
            For Best Size Use: 1920 x 1080
          </span>
        </span>
      );
    }
  };
  renderAvatarImageText = () => {
    console.log('renderAvatarImageText');
    if (this.state.courseInstructorAvatarPreview === "" || this.state.courseInstructorAvatarPreview === undefined || this.state.courseInstructorAvatarPreview === null) {
      return (
        <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          Instructor Image
          <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>
            Best: 512 x 512
          </span>
        </span>
      );
    }
  };
  renderFileUpload = () => {
    console.log('renderFileUpload');
    if (this.state.activeView.lectureFiles.length < 5) {
      return (
        <div>
          <label htmlFor="course-file" className="lmsNewFileAdd">
            Upload New File
          </label>
          <input type="file" onChange={this.handleLectureFile} id="course-file" style={{ display: 'none' }} />
        </div>
      );
    }
  };
  renderFile = (file, index) => {
    console.log('renderFile');
    if (file.isLoading === true) {
      return (
        <div key={`lmsRenderFile${index}`}>
          <div className="lmsNewFileBlock" ><span></span>{file.fileData.name} <CloseIcon size={35} style={{ color: '#777777', padding: '5px', cursor: 'pointer' }} onClick={() => this.deleteFile(file.id, index)} /></div>
          <LinearProgress variant='indeterminate' />
        </div>
      );
    } else {
      if (file.fileName) {
        return (
          <div key={`lmsRenderFile2${index}`}>
            <div className="lmsNewFileBlock">
              <span></span>
              {file.fileName}
              <CloseIcon
                size={35}
                style={{ color: '#777777', padding: '5px', cursor: 'pointer' }}
                onClick={() => this.deleteFile(file.id, index)}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div key={`lmsRenderFile2${index}`}>
            <div className="lmsNewFileBlock">
              <span></span>
              {file.fileData.name}
              <CloseIcon
                size={35}
                style={{ color: '#777777', padding: '5px', cursor: 'pointer' }}
                onClick={() => this.deleteFile(file.id, index)}
              />
            </div>
          </div>
        );
      }
    }
  };
  renderNewQuestion = (question, i) => {
    console.log('renderNewQuestion');
    if (question.questionType === 'multiple') {
      return (
        <div className="lmsNewLectureQuestionBlock" key={`lmsLecture${i}`}>
          <div className="lmsNewLectureQuestionContent">
            <span className="lmsNewLectureQuestionNum">{i + 1}</span>
            <TextField
              label="Question Content"
              fullWidth={true}
              onChange={(event) => this.handleQuestion(i, event)}
              onBlur={(event) => this.updateQuestion(i, event)}
              multiline
              rowsMax={3}
              value={question.questionContent}
            />
            <CloseIcon
              style={{ width: '25px', height: '25px', color: '#888888', cursor: 'pointer' }}
              onClick={() => this.deleteQuestion(question.id, i)}
            />
          </div>
          <span style={{ display: 'flex', flexDirection: 'row' }}>
            <FlatButton
              label="Add Answer"
              style={{ background: "#6fc13e", color: "#FFFFFF", marginLeft: '5px', width: '15%', height: '55px' }}
              onClick={() => this.storeAnswer(i)}
            >Add Answer</FlatButton>
            <div style={{ marginLeft: '30px', width: '85%' }}>
              {question.questionAnswers.map((answer, j) => (
                this.renderNewAnswer(answer, i, j)
              ))}
            </div>
          </span>
        </div>
      )
    } else if (question.questionType === 'open') {
      return (
        <div className="lmsNewLectureQuestionBlock" key={`lmsLecture2${i}`}>
          <div className="lmsNewLectureQuestionContent">
            <span className="lmsNewLectureQuestionNum">{i + 1}</span>
            <TextField
              label="Question Content"
              fullWidth={true}
              onChange={(event) => this.handleQuestion(i, event)}
              onBlur={(event) => this.updateQuestion(i, event)}
              multiline
              rowsMax={3}
              value={question.questionContent}
            />
            <CloseIcon
              style={{ width: '25px', height: '25px', color: '#888888', cursor: 'pointer' }}
              onClick={() => this.deleteQuestion(question.id, i)}
            />
          </div>
        </div>
      );
    }
  };

  renderNewAnswer = (answer, i, j) => {
    console.log('renderNewAnswer');
    let letter = "A";
    if (j === 0) { letter = "A" }
    else if (j === 1) { letter = "B" }
    else if (j === 2) { letter = "C" }
    else if (j === 3) { letter = "D" }
    else if (j === 4) { letter = "E" }
    else if (j === 5) { letter = "F" }
    return (
      <div style={{ marginBottom: '10px', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }} key={`renderNewAnswer${j}`}>
        <span className="lmsNewLectureQuestionNum">
          {letter}
        </span>
        <input
          type="radio"
          checked={answer.isCorrect}
          onChange={() => this.updateCorrect(i, j, answer.id)}
          name={'question-' + i}
        />
        <TextField
          value={answer.answerContent}
          onChange={event => this.handleAnswer(i, j, event)}
          onBlur={event => this.updateAnswer(i, j, event)}
          style={{ border: 'none', outline: 'none', marginLeft: '10px', width: '90%' }}
          placeholder="Type an Answer..."
          name={"answerContent-" + j}
        />
        <CloseIcon
          style={{ width: '25px', height: '25px', color: '#888888', cursor: 'pointer' }}
          onClick={() => this.deleteAnswer(answer.id, i, j)}
        />
      </div>
    );
  };
  renderLessonDelete = (id, i) => {
    console.log('renderLessonDelete');
    let lessons = [...this.state.lessons];
    if (lessons[i].pendingDelete === true) {
      return (
        <div className="lmsNewDeleteBlock">
          <FlatButton
            onClick={() => this.confirmLessonDelete(i)}
            style={{ background: '#FAFAFA', width: '50%', borderRadius: 'none' }}
          >Cancel</FlatButton>
          <FlatButton
            onClick={() => this.deleteLesson(id, i)}
            style={{ background: "#6fc13e", color: '#FFFFFF', width: '50%', borderRadius: 'none' }}
          >Confirm</FlatButton>
        </div>
      );
    }
  };
  renderLectureDelete = (id, i, j) => {
    console.log('renderLectureDelete');
    let lessons = [...this.state.lessons];
    if (lessons[i].lectures[j].pendingDelete === true) {
      return (
        <div className="lmsNewDeleteBlock">
          <FlatButton
            onClick={() => this.confirmLectureDelete(i, j)}
            style={{ background: "#FAFAFA", width: '50%', borderRadius: 'none' }}
          >Cancel</FlatButton>
          <FlatButton
            onClick={() => this.deleteLecture(id, i, j)}
            style={{ background: "#6fc13e", color: '#FFFFFF', width: '50%', borderRadius: 'none' }}
          >Confirm</FlatButton>
        </div>
      );
    }
  };
  renderSaving = () => {
    console.log('renderSaving');
    if (this.state.isSaving === true) {
      return (
        <LinearProgress variant='indeterminate' style={{ position: 'fixed', top: '0' }} />
      );
    }
  };
  renderLectureContent = () => {
    console.log('renderLectureContent');
    if (this.state.activeView.lectureType === "Text") {
      console.log('avlc', this.state.activeView.lectureContent);
      return (
        <div className="lmsLessonMainContent">
          <Editor
            editorState={this.state.activeView.lectureContent}
            toolbarClassName="home-toolbar"
            wrapperClassName="home-wrapper"
            editorClassName="rdw-editor-main"
            onEditorStateChange={this.handleLectureContent}
            placeholder="Type the Course Information Here..."
            onBlur={() => this.updateLecture(this.state.activeLesson, this.state.activeLecture)}
          />
        </div>
      );
    }
    else if (this.state.activeView.lectureType === "Video") {
      return (
        <div className="lmsLessonMainContent">
          <div className="lmsNewVideoBlock">
            <input
              className="lmsNewVideoBlockInput"
              placeholder="Paste ID of Video"
              value={this.state.activeView.lectureVideo}
              onChange={this.handleLectureVideo}
            />
            <span style={{ fontSize: '0.9rem', marginTop: '5px' }}>
              Currently Supported: Youtube
            </span>
          </div>
        </div>
      );
    } else if (this.state.activeView.lectureType === "File") {
      return (
        <div className="lmsLessonMainContent">
          <span style={{ fontSize: '0.9rem', marginTop: '5px', color: '#AAAAAA', fontFamily: 'Lato' }}>
            Maximum 5 Files per Lecture
          </span>
          <div className="lmsNewFileList">
            {this.state.activeView.lectureFiles.map((file, index) => (
              this.renderFile(file, index)
            ))}
            {this.renderFileUpload()}
          </div>
        </div>
      );
    } else if (this.state.activeView.lectureType === "Exam") {
      return (
        <div className="lmsLessonMainContent">
          <div className="lmsNewQuestionButton">
            <FlatButton
              style={{ color: "#FFFFFF", background: "#6fc13e", marginRight: '10px' }}
              onClick={() => this.storeQuestion('multiple')}
            >Add Multiple Choice</FlatButton>
            <FlatButton
              style={{ color: "#FFFFFF", background: "#6fc13e", marginRight: '10px' }}
              onClick={() => this.storeQuestion('open')}
            >Add Open-Ended</FlatButton>
          </div>
          <div className="lmsNewLectureQuestionList">
            {this.state.activeView.lectureQuestions.map((question, i) => (
              this.renderNewQuestion(question, i)
            ))}
          </div>
        </div>
      );
    }
  };
  renderCourseImage = () => {
    console.log('renderCourseImage');
    if (this.state.courseImage !== "") {
      return (
        <img alt="" src={this.state.courseImagePreview} className="lmsNewCourseImagePreview" />
      );
    } else {
      return (
        <img alt="" src={this.state.courseImagePreview} className="lmsNewCourseImagePreview" />
      );
    }
  };
  renderCourseContent = () => {
    console.log('renderCourseContent');
    if (this.state.activeLesson === -1) {
      return (
        <div className="lmsLessonColumnTwoContent">
          <div className="lmsLessonColumnTwoHeading">
            Course Description
          </div>
          <div className="lmsLessonMainContent">
            <div className="lmsLessonMainInline">
              {/*<TextField className="lmsLessonCourseSummary" label="Course Summary" onChange={this.handleCourseSummary}value={this.state.courseSummary} fullWidth={true} multiLine={true} rowsMax={2}/>*/}
              <FormControl style={{ width: '20%' }}>
                <InputLabel htmlFor="category-select">
                  Category
                </InputLabel>
                <SelectField
                  value={this.state.courseCategory}
                  onChange={this.handleCourseCategory}
                  style={{ marginLeft: '10px' }}
                  id='category-select'
                  inputProps={{
                    name: 'category',
                  }}
                >
                  {this.state.categories.map((category, index) => (
                    <MenuItem value={category.id} key={`lmsLecturerendercourse${index}`}>{category.categoryName}</MenuItem>
                  ))}
                </SelectField>
              </FormControl>
              {/*<div style={{display:'flex', flexDirection:'row', width:'100%', alignItems:'flex-end', marginLeft:'5px'}}>
                <span style={{color:'#999999', marginBottom:'10px', fontSize:'1.4em', marginRight:'5px'}}>$</span>
                <TextField className="lmsLessonCourseSummary" label="Course Price" onChange={this.handleCoursePrice}value={this.state.coursePrice} fullWidth={true}/>
                </div>*/}
            </div>
            <div className="lmsLessonMainImageRow">
              <label htmlFor="course-image" className="lmsLessonMainImageBlock">
                {this.renderPromoImageText()}
                {this.renderCourseImage()}
              </label>
              <input
                type="file"
                onChange={this.handleCourseImage}
                id="course-image"
                style={{ display: 'none' }}
              />
              <div className="lmsLessonMainImageBlock">
                <input
                  className="lmsNewVideoBlockInput"
                  placeholder="Paste Link to Promo Video (Optional)"
                  value={this.state.courseVideo}
                  onChange={this.handleCourseVideo}
                />
              </div>
            </div>
            <Editor
              editorState={this.state.courseInformation}
              toolbarClassName="home-toolbar"
              wrapperClassName="home-wrapper"
              editorClassName="rdw-editor-main"
              onEditorStateChange={this.handleCourseInformation}
              placeholder="Type the Course Information Here..."
            />
          </div>
        </div>
      );
    } else if (this.state.activeLesson === -2) {
      return (
        <div className="lmsLessonColumnTwoContent">
          <div className="lmsLessonColumnTwoHeading">Course Instructor</div>
          <div className="lmsLessonMainContent">
            <div className="lmsDetailAuthor">
              <div className="lmsDetailAuthorContainer">
                <div className="lmsDetailAuthorAvatar">
                  <label htmlFor="course-avatar" className="lmsLessonMainAvatarBlock">
                    {this.renderAvatarImageText()}
                    <img alt="" src={this.state.courseInstructorAvatarPreview} className="lmsNewCourseImagePreview" />
                  </label>
                  <input
                    type="file"
                    onChange={this.handleCourseInstructorAvatar}
                    id="course-avatar"
                    style={{ display: 'none' }}
                  />
                </div>
                <div className="lmsDetailAuthorInfo">
                  <input
                    className="lmsNewInstructorName"
                    placeholder="Instructor Name"
                    onChange={this.handleCourseInstructorName}
                    value={this.state.courseInstructorName}
                  />
                  <div>
                    <textarea
                      className="lmsNewAuthorContent"
                      placeholder="Instructor Description..."
                      value={this.state.courseInstructorInfo}
                      onChange={this.handleCourseInstructorInfo}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="lmsLessonColumnTwoContent">
          <div className="lmsNewLectureHeading">
            <div className="lmsLessonColumnTwoHeading">{this.state.activeView.lectureName}</div>
            <FormControl style={{ width: '20%' }}>
              <InputLabel htmlFor="lecture-select">Lecture Type</InputLabel>
              <SelectField
                value={this.state.activeLectureType}
                onChange={this.handleLectureType}
                style={{ marginLeft: '10px' }}
                id='category-select'
                inputProps={{
                  name: 'category',
                }}
              >
                <MenuItem value="Text">Text</MenuItem>
                <MenuItem value="Video">Video</MenuItem>
                <MenuItem value="File">File</MenuItem>
                <MenuItem value="Exam">Exam</MenuItem>
              </SelectField>
            </FormControl>
          </div>
          {this.renderLectureContent()}
        </div>
      );
    }
  };
  render() {
    return (
      <div className="container">
        <Helmet title="New" meta={[{ name: 'description', content: 'Description of New' }]} />
        <header>
          {this.renderSaving()}
        </header>
        <main className="lmsLessonMain">
          <div className="lmsLessonColumnOne">
            <div className="lmsLessonColumnOneHeader">
              <Link to="/LMS/MyLMS">
                <BackIcon color="#FFFFFF" style={{ padding: '5px' }} size={30} />
              </Link>
            </div>
            <div className="lmsLessonColumnOneContent">
              <textarea
                className="lmsNewCourseNameInput"
                placeholder="Your Course Name"
                onChange={this.handleCourseName}
                value={this.state.courseName}
              />
              <div className="lmsLessonList">
                {this.renderDiscussionMenu()}
                <div className="lmsNewLessonAddButton" onClick={this.storeLesson}>
                  <AddIcon color="#555555" size={25} />
                  <div className="lmsNewLessonAddButtonTitle">Add Lesson</div>
                </div>
                {!!this.state.lessons.length && this.state.lessons.map((lesson, currentLesson) => (
                  <div className="lmsLessonBlock" key={`lmslessonBlock1${currentLesson}`}>
                    <div className="lmsNewLessonBlockHeader">
                      <input
                        className="lmsNewLessonBlockHeaderInput"
                        value={lesson.lessonName}
                        onChange={(event) => this.handleLessonName(currentLesson, event)}
                        onBlur={(event) => this.updateLesson(lesson.id, event.target.value)}
                      />
                      <div className="lmsNewLessonCloseIcon">
                        <CloseIcon
                          style={{ width: '20px', height: '20px', color: '#888888', cursor: 'pointer' }}
                          onClick={() => this.confirmLessonDelete(currentLesson)}
                        />
                      </div>
                    </div>
                    {this.renderLessonDelete(lesson.id, currentLesson)}
                    {!!lesson.lectures.length && lesson.lectures.map((lecture, currentLecture) => (
                      this.renderMenu(currentLesson, currentLecture, lecture)
                    ))}
                    <div className="lmsNewLessonAddButton" onClick={() => this.storeLecture(currentLesson)}>
                      <AddIcon color="#555555" size={25} />
                      <div className="lmsNewLessonAddButtonTitle">Add Lecture</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lmsLessonColumnTwo">
            <div className="lmsNewColumnTwoHeader">
              <FlatButton
                label="Save"
                style={{ color: "#FFFFFF", marginRight: '10px' }}
                onClick={() => this.updateCourse('Draft')}
              >Save</FlatButton>
              <FlatButton
                label="Publish" style={{ color: "#FFFFFF", marginRight: '10px', background: "#6fc13e" }}
                onClick={() => this.updateCourse('Published')}
              >Publish</FlatButton>
            </div>
            {this.renderCourseContent()}
          </div>
        </main>
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