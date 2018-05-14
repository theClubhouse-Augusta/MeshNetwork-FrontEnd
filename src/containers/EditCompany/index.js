import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw
} from "draft-js";
import Snackbar from 'material-ui/Snackbar';
import draftToHtml from "draftjs-to-html";
import { Grid } from "material-ui";
import { withStyles } from 'material-ui/styles';
import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
  Button,
  CustomInput,
  ItemGrid,
  RegularCard
} from "../../components";
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import authenticate from '../../utils/Authenticate';
import StyleHelpers from '../../utils/StyleHelpers';
import editCompanyStyles from '../../variables/styles/editCompanyStyles';
import './style.css';

class EditCompany extends Component {
  state = {
    update: false,
    loading: true,
    companyId: '',
    name: '',
    employeeCount: '',
    description: '',
    logo: '',
    url: '',
    tags: [],
    logoPreview: '',
    options: [],
    multi: true,
    multiValue: [],
    selectedTags: [],
    loadedTags: [],
    focused: false,
    userID: '',
    snack: false,
    msg: '',
    id: '',
  };
  async componentDidMount() {
    let authorized;
    try {
      authorized = await authenticate(localStorage['token']);
    } finally {
      if (authorized !== undefined) {
        const { error, user } = authorized;
        if (user) {
          this.loadCompany();
          this.setState({
            loading: false,
            id: user.id,
          });
        } else if (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.props.history.push('/signin');
        }
      } else {
        this.props.history.push('/');
      }
    }
  };
  loadCompany = () => {
    fetch(`http://localhost:8000/api/company/user/get`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({ company, verticals: loadedTags, userID, }) => {
        if (company) {
          let {
            name,
            tags,
            logo,
            description,
            employeeCount,
            url,
            id: companyId
          } = company;
          this.setState({
            name,
            tags,
            logoPreview: logo,
            logo,
            employeeCount,
            companyId,
            url,
            description: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(description))),
            update: true,
            loadedTags,
            selectedTags: loadedTags
          });
        } else if (userID) {
          this.setState({
            userID,
            description: EditorState.createEmpty(),
          });
        }
      });
  };
  updateInput = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  };
  handleLogo = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        logo: file,
        logoPreview: reader.result
      });
    };
    reader.readAsDataURL(file);
  };
  selectTag = selectedTags => {
    this.setState({ selectedTags });
  };
  handleOnChange = value => {
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValue: value });
    } else {
      this.setState({ value });
    }
  };
  eventDescription = description => {
    this.setState({ description });
  };
  onFocus = () => {
    this.setState({
      focused: true
    });
  };
  onBlur = () => {
    this.setState({
      focused: false
    });
  };
  showSnack = msg => {
    this.setState(() => ({
      snack: true,
      msg,
    }));
  };
  handleRequestClose = () => {
    this.setState(() => ({
      snack: false,
      msg: ""
    }));
  };
  onSubmit = e => {
    e.preventDefault();
    const {
      name,
      tags,
      logo,
      employeeCount,
      description,
      url,
      companyId,
      userID,
      multiValue,
      selectedTags,
      update
    } = this.state;
    let data = new FormData();
    data.append('description', draftToHtml(convertToRaw(description.getCurrentContent())));
    data.append('name', name);
    data.append('url', url);
    data.append('tags', tags);
    data.append('employeeCount', employeeCount);
    data.append('update', update);
    if (userID) {
      data.append('userID', userID);
    }
    data.append('logo', logo);
    if (companyId) {
      data.append('companyId', companyId);
    }
    if (selectedTags.length) {
      data.append('tags', JSON.stringify(selectedTags));
    } else if (multiValue.length) {
      data.append('tags', JSON.stringify(multiValue));
    }
    const createURI = `http://localhost:8000/api/company/create`;
    const updateURI = `http://localhost:8000/api/company/update/${companyId}`;
    const postUrl = companyId ? updateURI : createURI;
    fetch(postUrl, {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
      method: 'post',
      body: data,
    })
      .then(response => response.json())
      .then(({ success, error }) => {
        if (error) {
          this.showSnack(error);
        } else if (success) {
          this.showSnack(success);
          setTimeout(() => {
            this.props.history.push(`/memberdash/${this.state.id}`);
          }, 2000);
        }
      });
  };
  render() {
    const {
      name,
      employeeCount,
      logo,
      url,
      loadedTags,
      selectedTags,
      focused,
      options,
      multiValue,
      companyId,
    } = this.state;
    const Helper = new StyleHelpers();
    const marginTop = selectedTags ? Helper.getLabelStyle(focused, selectedTags)[0] : '';
    const color = selectedTags ? Helper.getLabelStyle(focused, selectedTags)[1] : '';
    const { spaceName, classes } = this.props;
    return (
      this.state.loading ? (
        <Spinner loading={this.state.loading} />
      ) : (
          <div className={classes.container}>
            <Header
              space={spaceName}
              marginBottom={window.innerWidth >= 700 ? 80 : 30}
              borderBottom="1px solid black"
            />
            <Grid container justify="center">
              <ItemGrid xs={12} sm={12} md={8}>
                <RegularCard
                  cardTitle="Edit Company"
                  cardSubtitle="Complete your company's profile"
                  content={
                    <div>
                      <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Company name"
                            id="name"
                            formControlProps={{ fullWidth: true, }}
                            onChange={this.updateInput}
                            value={name}
                            marginBottom
                          />
                        </ItemGrid>

                        <ItemGrid xs={12} sm={12} md={12}>
                          <label style={{ marginTop: marginTop, color: color, }} className={Helper.getLabelClassName(focused, selectedTags)}>
                            Company Verticals
                      </label>
                          {console.log('l', loadedTags)}
                          {!!loadedTags.length &&
                            <Select.Creatable
                              placeholder={!focused && !!!selectedTags.length ? 'Company Verticals' : ''}
                              className={Helper.getSelectClassName(focused, selectedTags)}
                              style={{ border: 'none', boxShadow: 'none' }}
                              multi
                              options={loadedTags}
                              onChange={this.selectTag}
                              value={selectedTags}
                              onFocus={this.onFocus}
                              onBlur={this.onBlur}
                              promptTextCreator={() => "create new tag"}
                            // noResultsText={""}
                            />
                          }
                          {!!!loadedTags.length &&
                            <Select.Creatable
                              placeholder={!focused && !!!selectedTags.length ? 'Skills' : ''}
                              multi
                              className={Helper.getSelectClassName(focused, selectedTags)}
                              options={loadedTags}
                              style={{ border: 'none', boxShadow: 'none' }}
                              onChange={this.handleOnChange}
                              value={multiValue}
                              onFocus={this.onFocus}
                              onBlur={this.onBlur}
                              promptTextCreator={() => "create new tag"}
                            //                              noResultsText={""}
                            />
                          }
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Company website"
                            id="url"
                            formControlProps={{ fullWidth: true, }}
                            onChange={this.updateInput}
                            value={url}
                          />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <Editor
                            editorState={this.state.description}
                            toolbarclassName="challenges_question-toolbar"
                            wrapperclassName="challenges_question-wrapper"
                            editorclassName="challenges_question-editor-main"
                            onEditorStateChange={this.eventDescription}
                            placeholder="Brief Description"
                            toolbar={{
                              inline: { inDropdown: true },
                              fontSize: { className: "toolbarHidden" },
                              fontFamily: { className: "toolbarHidden" },
                              list: { inDropdown: true, options: ["unordered", "ordered"] },
                              textAlign: {
                                inDropdown: true,
                                options: ["left", "center", "right"]
                              },
                              link: { inDropdown: true },
                              remove: { className: "toolbarHidden" },
                              emoji: { className: "toolbarHidden" },
                              history: { className: "toolbarHidden" }
                            }}
                          />
                        </ItemGrid>
                      </Grid>
                      <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Number of employees"
                            id="employeeCount"
                            formControlProps={{ fullWidth: true }}
                            onChange={this.updateInput}
                            value={employeeCount}
                          />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <div className={classes.spaceLogoMainImageRow}>
                            <label htmlFor="logo-image" className={classes.spaceLogoMainImageBlock}>
                              {logo && <img src={this.state.logoPreview} className={classes.spaceLogoImagePreview} alt="" />}
                              {!logo &&
                                <span className={classes.logoInput}>
                                  Company Logo
                            <span className={classes.logoInputSubheader}>For Best Size Use: 512 x 512</span>
                                </span>
                              }
                            </label>
                            <input type="file" onChange={this.handleLogo} id="logo-image" style={{ display: 'none' }} />
                          </div>
                        </ItemGrid>
                      </Grid>
                    </div>
                  }
                  footer={
                    <Button
                      className={classes.button}
                      color="primary"
                      onClick={this.onSubmit}
                    >{companyId ? 'Update' : 'Add'} Company</Button>}
                />
              </ItemGrid>
            </Grid>
            <Snackbar
              open={this.state.snack}
              message={this.state.msg}
              autoHideDuration={5000}
              onClose={this.handleRequestClose}
            />
          </div>
        ));
  }
}
export default withStyles(editCompanyStyles)(EditCompany);
