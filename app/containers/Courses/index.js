/*
 *
 * Browse
 *
 */

import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
// import SelectField from 'material-ui/Select';
// import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/Button";
import Card, { CardContent, CardMedia } from "material-ui/Card";
// CardActions,
import Typography from "material-ui/Typography";
// import { FormControl} from 'material-ui/Form';
// import Input, { InputLabel } from 'material-ui/Input';

import PreviousIcon from "react-icons/lib/fa/arrow-left";
import NextIcon from "react-icons/lib/fa/arrow-right";

import Header from "components/Header";

import "./style.css";
import "./styleM.css";

export default class Courses extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      category: 0,
      courses: [],
      categories: [],
      count: 9,
      page: 1,
      nextPage: 0,
      previousPage: 0,
      searchContent: "",
      order: "all",
      searched: "",
      app: this.props.app
    };
  }

  componentWillMount() {
    this.getCourses(0);
    this.getCategories();
  }

  componentWillReceiveProps(app) {
    this.setState(
      {
        app: app.app
      },
      () => {
        this.forceUpdate();
      }
    );
  }

  handleSearch = event => {
    this.setState(
      {
        searchContent: event.target.value
      },
      () => {
        if (this.state.searchContent.length > 4) {
          this.searchCourses();
        } else if (this.state.searchContent.length === 0) {
          this.getCourses();
        }
      }
    );
  };
  handleCategory = (event, index, value) => {
    this.setState(
      {
        page: 1,
        category: value
      },
      () => {
        this.getCourses(value);
      }
    );
  };

  getCourses = (category = 0) => {
    if (
      this.state.order === "search" &&
      this.state.searchContent !== this.state.searched
    ) {
      this.setState({
        order: "all",
        page: 1,
        nextPage: 0,
        previousPage: 0,
        searched: this.state.searchContent
      });
    }

    fetch(`https://innovationmesh.com/api/getCourses/${category}/${this.state.count}?page=${this.state.page}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
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
        });
      });
  };

  getNextCourses = category => {
    this.setState(
      {
        page: this.state.nextPage
      },
      () => {
        if (this.state.order === "all") {
          this.getCourses(category);
        } else if (this.state.order === "search") {
          this.searchCourses();
        }
      }
    );
  };

  getPreviousCourses = category => {
    this.setState(
      {
        page: this.state.previousPage
      },
      () => {
        if (this.state.order === "all") {
          this.getCourses(category);
        } else if (this.state.order === "search") {
          this.searchCourses();
        }
      }
    );
  };

  getCategories = () => {
    fetch("https://innovationmesh.com/api/getCategories", {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          categories: json.categories
        })
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          categories: json.categories
        });
      });
  };

  searchCourses = () => {
    if (this.state.order === "all") {
      this.setState({
        order: "search",
        page: 1,
        nextPage: 0,
        previousPage: 0
      });
    }

    let data = new FormData();
    data.append("searchContent", this.state.searchContent);

    fetch('https://innovationmesh.com/api/searchCourse', {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          courses: json,
          isLoading: false
        })
      })
      .then(response => response.json())
      .then(json => {
        this.setState({
          courses: json,
          isLoading: false
        });
      });
  };

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
        <FlatButton
          icon={<PreviousIcon color="#FFFFFF" />}
          style={{
            background: previousColor,
            color: "#FFFFFF",
            minWidth: "150px",
            maxWidth: "200px",
            height: "40px",
            marginLeft: "10px",
            marginRight: "10px"
          }}
          onClick={() => this.getPreviousCourses(this.state.category)}
          disabled={previousDisabled}
        >
          Previous
        </FlatButton>
        <FlatButton
          icon={<NextIcon color="#FFFFFF" />}
          style={{
            background: nextColor,
            color: "#FFFFFF",
            minWidth: "150px",
            maxWidth: "200px",
            height: "40px",
            marginLeft: "10px",
            marginRight: "10px"
          }}
          onClick={() => this.getNextCourses(this.state.category)}
          disabled={nextDisabled}
        >
          Next
        </FlatButton>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <Helmet
          title="Browse"
          meta={[{ name: "description", content: "Description of Browse" }]}
        />
        <header>
          <Header space={this.props.spaceName} />
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
                  <MenuItem value={category.id} key={`${index}`}>{category.categoryName}</MenuItem>
                ))}
              </SelectField>
            </FormControl>*/}
              <TextField
                placeholder="Search"
                fullWidth
                value={this.state.searchContent}
                onChange={this.handleSearch}
              />
            </div>
            <div className="lmsHomeMainList">
              {this.state.courses.map((course, index) => (
                <Link
                  className="lmsHomeMainBlock"
                  key={`CourseslmsHomeMainBlock${index}`}
                  to={"/LMS/Course/" + course.id}
                >
                  <Card style={{ height: "385px" }}>
                    <CardMedia
                      style={{
                        width: "100%",
                        height: "240px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                      image={course.courseImage}
                    />
                    <CardContent>
                      <Typography type="headline" component="h2">
                        {course.courseName}
                      </Typography>
                      <Typography component="p">
                        {/*course.courseSummary*/}
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
