import React, { Component }  from "react";
import { Grid, InputLabel } from "material-ui";
import { withStyles } from 'material-ui/styles';
import Select from 'react-select';
import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
} from "../../components";
import Header from '../../components/Header';
import editCompanyStyles from '../../variables/styles/editCompanyStyles';
import StyleHelpers from '../../utils/StyleHelpers';
import './style.css';

class EditCompany extends Component {
  state = {
    companyId: '', 
    name: '',    
    employeeCount: '',    
    description: '',    
    logo: '',    
    url: '',    
    tags: [],    
    logo: '',
    logoPreview: '',
    options: [],
    multi: true,
    multiValue: [],
    selectedTags: [],
    loadedTags: [],
    focused: false,
  };
  componentDidMount() {
    this.loadCompany(); 
    this.loadVerticals();
  };

  loadCompany = () => {
    fetch(`http://localhost:8000/api/company/user/update`, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({ company }) => {
        if (company) {
          const {
            name,
            tags,
            logo,
            employeeCount,
            description,
            url,
            companyId
          } = company;
          this.setState({
            name,
            tags,
            logoPreview: logo,
            logo,
            employeeCount,
            description, 
            companyId,
            url
          });
        } 
      });
  };
  update = (event, field) => {
    this.setState({
      [field]: event.target.value 
    });
  };
  loadVerticals = () => {
    fetch('http://localhost:8000/api/verticals/all', {
      headers: { Authorization: `Bearer ${localStorage['token']}` },
    })
    .then(response => response.json())
    .then(loadedTags => { 
      this.setState({ 
        loadedTags
      })
    })
    .catch(error => {
      alert(`error in fetching data from server: ${error}`);
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
  selectTag = selectedTag => {
    this.setState({ selectedTags: selectedTag });
  };
  handleOnChange = (value) => {
    let { options } = this.state;
    const { multi } = this.state;
    if (multi) {
      this.setState({ multiValue: value });
    } else {
      this.setState({ value });
    }
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
    } = this.state;
    let data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('tags', tags);
    data.append('employeeCount', employeeCount);
    data.append('url', url);
    data.append('logo', logo);
    if (companyId) {
      data.append('companyId', companyId);
    }
    data.append('tags', JSON.stringify(this.state.selectedTags));
    const create = `http://localhost:8000/company/create`;
    const update = `http://localhost:8000/company/update/${companyId}`;
    const postUrl = companyId ? update : create;
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
      }
    });
  };

  render() {
    const { spaceName, classes } = this.props;
    const { 
      name, 
      description,
      employeeCount,
      logo,
      url,
      loadedTags,
      selectedTags,
      focused,
      options,
      multiValue
    } = this.state;
    return (
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
                        onChange={this.update}
                        value={name}
                      />
                    </ItemGrid>

                    <ItemGrid xs={12} sm={12} md={12}>
                      {!!loadedTags.length &&
                        <Select.Creatable
                          placeholder={!focused && !!!selectedTags.length ? 'Skills' : ''}
                          className={Helper.getSelectStyle(focused, selectedTags)}
                          style={{background: '#f8f8f8', border: 'none', boxShadow: 'none'}}
                          multi
                          options={loadedTags}
                          onChange={this.selectTag}
                          value={selectedTags}
                          onFocus={this.onFocus}
                          onBlur={this.onBlur}
                        />
                      }
                      {!!!loadedTags.length &&
                        <Select.Creatable
                          placeholder={!focused && !!!selectedTags.length ? 'Skills' : ''}
                          multi
                          className={Helper.getSelectStyle(focused, selectedTags)}
                          options={options}
                          style={{background: '#f8f8f8', border: 'none', boxShadow: 'none'}}
                          onChange={this.handleOnChange}
                          value={multiValue}
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
                        onChange={this.update}
                        value={url}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Description"
                        id="description"
                        inputProps={{ rows: 5, multiline: true, }}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.update}
                        value={description}
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Number of employees"
                        id="employeeCount"
                        formControlProps={{ fullWidth: true }}
                        onChange={this.update}
                        value={employeeCount}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <div className={classes.spaceLogoMainImageRow}>
                        <label htmlFor="logo-image" className={classes.spaceLogoMainImageBlock}>
                        {logo && <img src={this.state.logoPreview} className={classes.spaceLogoImagePreview} alt="" /> }
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
                >Update Company</Button>}
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(editCompanyStyles)(EditCompany);
