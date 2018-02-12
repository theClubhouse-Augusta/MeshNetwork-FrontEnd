/*
 *
 * Browse
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import SelectField from 'material-ui/Select';
import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/Button';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { FormControl} from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

import PreviousIcon from 'react-icons/lib/fa/arrow-left';
import NextIcon from 'react-icons/lib/fa/arrow-right';

import Header from 'components/Header';

import './style.css';
import './styleM.css';

export default class Courses extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      category:0,
      courses:[],
      categories:[],
      count:9,
      page:1,
      nextPage:0,
      previousPage:0,
      searchContent:"",
      order:"all",
      searched:"",
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

  handleSearch = (event) => {
    this.setState({
      searchContent:event.target.value
    }, function() {
      if(this.state.searchContent.length > 4) {
        this.searchCourses();
      } else if(this.state.searchContent.length === 0) {
        this.getCourses();
      }
    })
  };
  handleCategory = (event, index, value) => {
    this.setState({
      page:1,
      category:value
    }, function() {
      this.getCourses(value);
    })
  }

  getCourses = (category = 0) => {
    if(this.state.order === "search" && this.state.searchContent !== this.state.searched) {
      this.setState({
        order:"all",
        page:1,
        nextPage:0,
        previousPage:0,
        searched:this.state.searchContent
      })
    }

    fetch('https://lms.innovationmesh.com/getCourses/'+category+'/'+this.state.count+'/'+this.state.page+'/', {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        nextPage:json.nextPageNum,
        previousPage:json.previousPageNum,
        courses: json.courses,
        isLoading:false
      })
    }.bind(this))
  };

  getNextCourses = (category) => {
    this.setState({
      page:this.state.nextPage
    }, function() {
      if(this.state.order === "all") {
        this.getCourses(category);
      }
      else if(this.state.order === "search") {
        this.searchCourses();
      }
    })
  };

  getPreviousCourses = (category) => {
    this.setState({
      page:this.state.previousPage
    }, function() {
      if(this.state.order === "all") {
        this.getCourses(category);
      }
      else if(this.state.order === "search") {
        this.searchCourses();
      }
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

  searchCourses = () => {
    if(this.state.order === "all") {
      this.setState({
        order:"search",
        page:1,
        nextPage:0,
        previousPage:0,
      })
    }

    let _this = this;
    let data = new FormData();
    data.append('searchContent', this.state.searchContent);

    fetch('https://lms.innovationmesh.com/searchCourse/'+this.state.count+'/'+this.state.page+'/', {
      method:'POST',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        nextPage:json.nextPageNum,
        previousPage:json.previousPageNum,
        courses: json.courses,
        isLoading:false
      })
    }.bind(this))
  };

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
        <FlatButton icon={<PreviousIcon color="#FFFFFF"/>}  style={{background:previousColor, color:'#FFFFFF', width:'200px', height:'40px', marginLeft:'10px', marginRight:'10px'}} onClick={() => this.getPreviousCourses(this.state.category)} disabled={previousDisabled}>Previous</FlatButton>
        <FlatButton icon={<NextIcon color="#FFFFFF"/>}  style={{background:nextColor, color:'#FFFFFF', width:'200px', height:'40px', marginLeft:'10px', marginRight:'10px'}} onClick={() => this.getNextCourses(this.state.category)} disabled={nextDisabled}>Next</FlatButton>
      </div>
    )
  }

  render() {

    return (
      <div className="container">
        <Helmet title="Browse" meta={[ { name: 'description', content: 'Description of Browse' }]}/>
        <header>
          <Header/>
        </header>
        <main className="lmsHomeMain">
          <div className="lmsHomeMainContainer">
            <div className="lmsBrowseSearch">
            {/*<FormControl style={{width:'20%'}}>
              <InputLabel htmlFor="category-select">Select Category</InputLabel>
              <SelectField
                label="Category"
                value={this.state.category}
                onChange={this.handleCategory}
                inputProps={{
                  name: 'category',
                  id: 'category-select',
                }}
              >
                <MenuItem value={0}>All Categories</MenuItem>
                {this.state.categories.map((category, index) => (
                  <MenuItem value={category.id} key={index}>{category.categoryName}</MenuItem>
                ))}
              </SelectField>
            </FormControl>*/}
            <TextField placeholder="Search" value={this.state.searchContent} onChange={this.handleSearch}/>
            </div>
            <div className="lmsHomeMainList">
              {this.state.courses.map((course, index) => (
                <Link className="lmsHomeMainBlock" key={index} to={'/LMS/Course/'+course.id}>
                  <Card style={{height:'385px'}}>
                    <CardMedia
                      style={{width:'100%', height:'240px', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}
                      image={'http://houseofhackers.me/media/' + course.courseImage}
                    />
                    <CardContent>
                      <Typography type="headline" component="h2">
                        {course.courseName}
                      </Typography>
                      <Typography component="p">
                        {course.courseSummary}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {this.renderPageButtons()}
          </div>
        </main>
      </div>
    );
  }
}
