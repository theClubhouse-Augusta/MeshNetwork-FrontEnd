import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw
} from "draft-js";
import { SingleDatePicker } from 'react-dates';
import draftToHtml from "draftjs-to-html";
import {
  Grid,
  Select as MaterialSelect,
  InputLabel
} from "material-ui";
import Snackbar from 'material-ui/Snackbar';
import { withStyles } from 'material-ui/styles';
import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment';
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
    logoPreview: '',
    options: [],
    selectedTags: [],
    loadedTags: [],
    focused: false,
    dateFocused: false,
    userID: '',
    snack: false,
    msg: '',
    id: '',
    facebook: '',
    instagram: '',
    pinterest: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    snapchat: '',
    discord: '',
    foundingDate: '',
    zipcode: '',
    city: '',
    state: '',
    address: '',
    email: '',
  };
  states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  async componentDidMount() {
    let authorized;
    try {
      authorized = await authenticate(localStorage['token']);
    } finally {
      if (authorized !== undefined) {
        const { error, user } = authorized;
        if (user) {
          const verticals = await this.loadVerticals();
          if (verticals) {
            const company = await this.loadCompany();
            if (company) {
              this.setState({
                loading: false,
                id: user.id,
              });
            }
          }
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
  loadCompany = async () => {
    const response = await fetch(`http://localhost:8000/api/company/user/get`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    });
    const json = await response.json();
    const { company, verticals: loadedTags, userID, } = json;
    if (company) {
      let {
        name,
        logo,
        description,
        employeeCount,
        url,
        id: companyId,
        facebook,
        instagram,
        pinterest,
        twitter,
        youtube,
        linkedin,
        snapchat,
        discord,
        foundingDate,
        zipcode,
        city,
        state,
        address,
        email,
      } = company;
      this.setState({
        name,
        logoPreview: logo,
        logo,
        employeeCount,
        companyId,
        url,
        description: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(description))),
        update: true,
        loadedTags,
        selectedTags: loadedTags,
        facebook,
        instagram,
        pinterest,
        twitter,
        youtube,
        linkedin,
        snapchat,
        discord,
        foundingDate: moment(foundingDate),
        zipcode,
        city,
        state,
        address,
        email,
      });
    } else if (userID) {
      this.setState({
        userID,
        description: EditorState.createEmpty(),
      });
    }
    return true;
  };
  loadVerticals = async () => {
    const response = await fetch(`http://localhost:8000/api/verticals`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    });
    const json = await response.json();
    const { options } = json;
    this.setState({ options });
    return true;
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
  onDateChange = foundingDate => {
    this.setState({ foundingDate });
  };
  onSubmit = e => {
    e.preventDefault();
    const {
      name,
      logo,
      employeeCount,
      description,
      url,
      companyId,
      userID,
      selectedTags,
      update,
      facebook,
      instagram,
      pinterest,
      twitter,
      youtube,
      linkedin,
      snapchat,
      discord,
      foundingDate,
      zipcode,
      city,
      state,
      address,
      email,
      id,
    } = this.state;
    let data = new FormData();
    if (description) data.append('description', draftToHtml(convertToRaw(description.getCurrentContent())));
    if (name) data.append('name', name);
    if (url) data.append('url', url);
    if (id) data.append('userID', id);
    if (email) data.append('email', email);
    if (zipcode) data.append('zipcode', zipcode);
    if (city) data.append('city', city);
    if (state) data.append('state', state);
    if (address) data.append('address', address);
    if (facebook) data.append('facebook', facebook);
    if (youtube) data.append('youtube', youtube);
    if (linkedin) data.append('linkedin', linkedin);
    if (snapchat) data.append('snapchat', snapchat);
    if (discord) data.append('discord', discord);
    if (twitter) data.append('twitter', twitter);
    if (instagram) data.append('instagram', instagram);
    if (pinterest) data.append('pinterest', pinterest);
    if (foundingDate) data.append('foundingDate', moment(foundingDate).format("YYYY-MM-DD HH:mm:ss"));
    if (employeeCount) data.append('employeeCount', employeeCount);
    data.append('update', update);
    if (userID) data.append('userID', userID);
    if (logo) data.append('logo', logo);
    if (companyId) data.append('companyId', companyId);
    if (selectedTags.length) data.append('tags', JSON.stringify(selectedTags));
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
      dateFocused,
      companyId,
      facebook,
      instagram,
      pinterest,
      twitter,
      youtube,
      linkedin,
      snapchat,
      discord,
      foundingDate,
      zipcode,
      city,
      email,
      state,
      address,
      options,
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
                          <CustomInput
                            labelText="Company email"
                            id="email"
                            formControlProps={{ fullWidth: true, }}
                            onChange={this.updateInput}
                            value={email}
                            marginBottom
                          />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Address"
                            id="address"
                            formControlProps={{ fullWidth: true }}
                            onChange={this.updateInput}
                            value={address}
                          />
                        </ItemGrid>
                        <Grid container justify="center">
                          <ItemGrid xs={12} sm={12} md={3}>
                            <CustomInput
                              labelText="City"
                              id="city"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={city}
                            />
                          </ItemGrid>
                          <ItemGrid
                            className={classes.selectInput}
                            xs={12} sm={12} md={3}>
                            <InputLabel htmlFor="state" className={classes.selectLabel}>
                              State
                          </InputLabel>
                            <MaterialSelect
                              native
                              value={state}
                              onChange={e => this.updateInput(e, 'state')}
                              inputProps={{ id: 'state' }}
                            >
                              {this.states.map((state, key) =>
                                <React.Fragment key={`statecode${key}`}>
                                  <option value={state}>{state}</option>
                                </React.Fragment>
                              )}
                            </MaterialSelect>
                          </ItemGrid>
                          <ItemGrid xs={12} sm={12} md={3}>
                            <CustomInput
                              labelText="Zipcode"
                              id="zipcode"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={zipcode}
                            />
                          </ItemGrid>
                        </Grid>
                        <div className={classes.datePicker} xs={12} sm={12} md={2}>
                          {foundingDate &&
                            <InputLabel htmlFor="datepicker" className={classes.selectLabel}>
                              Founding Date
                            </InputLabel>
                          }
                          <SingleDatePicker
                            id="datepicker"
                            isOutsideRange={() => false}
                            placeholder="Founding Date"
                            date={foundingDate} // momentPropTypes.momentObj or null
                            onDateChange={this.onDateChange} // PropTypes.func.isRequired
                            focused={dateFocused} // PropTypes.bool
                            onFocusChange={({ focused }) => this.setState({ dateFocused: focused })} // PropTypes.func.isRequired
                            showClearDate
                            numberOfMonths={1}
                            showDefaultInputIcon
                          />
                        </div>
                        <ItemGrid xs={12} sm={12} md={12}>
                          {(focused || !!selectedTags.length) &&
                            <label style={{ marginTop: marginTop, color: color, }} className={Helper.getLabelClassName(focused, selectedTags)}>
                              Company Verticals
                            </label>
                          }
                          {!!loadedTags.length &&
                            <Select.Creatable
                              placeholder={!focused && !!!selectedTags.length ? 'Company Verticals' : ''}
                              className={Helper.getSelectClassName(focused, selectedTags)}
                              style={{ border: 'none', boxShadow: 'none' }}
                              multi
                              options={options}
                              onChange={this.selectTag}
                              value={selectedTags}
                              onFocus={this.onFocus}
                              focused={focused}
                              onBlur={this.onBlur}
                            />
                          }
                          {!!!loadedTags.length &&
                            <Select.Creatable
                              placeholder={!focused && !!!selectedTags.length ? 'Company Verticals' : ''}
                              multi
                              className={Helper.getSelectClassName(focused, selectedTags)}
                              options={options}
                              style={{ border: 'none', boxShadow: 'none' }}
                              focused={focused}
                              onChange={this.selectTag}
                              value={selectedTags}
                              onFocus={this.onFocus}
                              onBlur={this.onBlur}
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
                        <Grid container justify="center">
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Facebook"
                              id="facebook"
                              type="url"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={facebook}
                            />
                          </ItemGrid>
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Youtube"
                              id="youtube"
                              type="url"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={youtube}
                            //   middle
                            />
                          </ItemGrid>
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Snapchat"
                              id="snapchat"
                              type="url"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={snapchat}
                            />
                          </ItemGrid>
                        </Grid>
                        <Grid container justify="center">
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Linkedin"
                              id="linkedin"
                              type="url"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={linkedin}
                            />
                          </ItemGrid>
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Discord"
                              id="discord"
                              type="url"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={discord}
                            />
                          </ItemGrid>
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Instagram"
                              id="instagram"
                              type="url"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={instagram}
                            />
                          </ItemGrid>
                        </Grid>
                        <Grid container justify="center">
                          <ItemGrid xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Twitter"
                              id="twitter"
                              type="url"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={twitter}
                            />
                          </ItemGrid>
                          <ItemGrid xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Pinterest"
                              type="url"
                              id="pinterest"
                              formControlProps={{ fullWidth: true }}
                              onChange={this.updateInput}
                              value={pinterest}
                            />
                          </ItemGrid>
                        </Grid>
                        <ItemGrid xs={12} sm={12} md={12}>
                          <div className={classes.spaceLogoMainImageRow}>
                            <label htmlFor="logo-image" className={classes.spaceLogoMainImageBlock}>
                              {logo && <img src={this.state.logoPreview} className={classes.spaceLogoImagePreview} alt="" />}
                              {!logo &&
                                <span className={classes.logoInput}>
                                  Company Logo
                                  <span className={classes.logoInputSubheader}>
                                    For Best Size Use: 512 x 512
                                  </span>
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
