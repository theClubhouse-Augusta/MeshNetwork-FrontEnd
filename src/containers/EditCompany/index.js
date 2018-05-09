import React, { Component }  from "react";
import { Grid, InputLabel } from "material-ui";
import { withStyles } from 'material-ui/styles';
import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid,
} from "../../components";
import Header from '../../components/Header';
import editCompanyStyles from '../../variables/styles/editCompanyStyles';

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
  };
  componentDidMount() {
    this.loadCompany(); 
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
    data.append('companyId', companyId);
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
      tags,
      url
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
