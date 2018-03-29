import React, { PureComponent } from "react";
import { Grid } from "material-ui";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import {
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "../../components";

class ResourceForm extends PureComponent {
  state = {
    resources: [],
    name: '',
    email: '',
    days: '',
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    startTime: '',
    startDay: '',
    endDay: '',
    endTime: '',
    increment: 0,
  };
  componentDidMount() {
    this.getResources(this.props.spaceID);
  }
  onChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  getResources = (id) => {
    fetch('http://testbean2-env.us-east-1.elasticbeanstalk.com/api/resources/' + id)
      .then(response => response.json())
      .then(resources => {
        this.setState(() => ({ resources }))
      })
  };
  handleResourceMonday = (event) => {
    this.setState({
      monday: event.target.checked
    });
  };
  handleResourceTuesday = (event) => {
    this.setState({
      tuesday: event.target.checked
    });
  };
  handleResourceWednesday = (event) => {
    this.setState({
      wednesday: event.target.checked
    });
  };
  handleResourceThursday = (event) => {
    this.setState({
      thursday: event.target.checked
    });
  };
  handleResourceFriday = (event) => {
    this.setState({
      friday: event.target.checked
    });
  };
  storeResource = () => {
    let resources = this.state.resources;
    let days = [];
    if (this.state.monday === 1) {
      days.push(this.state.monday);
    }
    if (this.state.tuesday === 2) {
      days.push(this.state.tuesday);
    }
    if (this.state.wednesday === 3) {
      days.push(this.state.wednesday);
    }
    if (this.state.thursday === 4) {
      days.push(this.state.thursday);
    }
    if (this.state.friday === 5) {
      days.push(this.state.friday);
    }
    let data = new FormData();
    data.append('spaceID', this.props.spaceID);
    data.append('resourceName', this.state.name);
    data.append('resourceEmail', this.state.email);
    data.append('resourceStartTime', this.state.startTime);
    data.append('resourceStartEnd', this.state.startEnd);
    data.append('resourceEndTime', this.state.endTime);
    data.append('resourceIncrement', this.state.increment);
    data.append('resourceDays', JSON.stringify(days));
    fetch('http://testbean2-env.us-east-1.elasticbeanstalk.com/api/resource', {
      method: 'POST',
      body: data,
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({ success, error, resource }) => {
        if (error) {
          this.showSnack(error);
        }
        else if (success) {
          this.showSnack(success);
          resources.push(resource);
          this.setState({
            resources: resources,
            name: "",
            email: ""
          })
        }
      })
  };
  deleteResource = (id, i) => {
    let resource = this.state.resources;
    fetch('http://testbean2-env.us-east-1.elasticbeanstalk.com/api/resource/' + id, {
      headers: { Authorization: `Bearer ${localStorage['token']}` }
    })
      .then(response => response.json())
      .then(({ error, success }) => {
        if (error) {
          this.showSnack(error);
        } else if (success) {
          this.showSnack(success);
          resource.splice(i, 1);
          this.setState(() => ({ resource }));
        }
      })
  };
  render() {
    const {
      history,
      spaceName,
      spaceID,
    } = this.props;
    return (
      <div>
        <Grid container justify="center">
          <ItemGrid xs={12} sm={12} md={8}>
            <RegularCard
              cardTitle={`Resource Management`}
              cardSubtitle={`Manage Resources at ${spaceName}`}
              content={
                <div>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Resource Name"
                        id="name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        value={this.state.name}
                        onChange={this.onChange('name')}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Email address"
                        id="Resource email-address"
                        formControlProps={{
                          fullWidth: true
                        }}
                        value={this.state.email}
                        onChange={this.onChange('email')}
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <FormGroup
                      style={{ marginTop: 32 }}
                      row
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.resourceMonday}
                            onChange={this.handleResourceMonday}
                            value={1}
                          />
                        }
                        label="Monday"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.resourceTuesday}
                            onChange={this.handleResourceTuesday}
                            value={2}
                          />
                        }
                        label="Tuesday"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.resourceWednesday}
                            onChange={this.handleResourceWednesday}
                            value={3}
                          />
                        }
                        label="Wednesday"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.resourceThursday}
                            onChange={this.handleResourceThursday}
                            value={4}
                          />
                        }
                        label="Thursday"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.resourceFriday}
                            onChange={this.handleResourceFriday}
                            value={5}
                          />
                        }
                        label="Friday"
                      />
                    </FormGroup>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <label htmlFor="start-time">start</label>
                      <CustomInput
                        labelText="start time"
                        id="start-time"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        value={this.state.startTime}
                        type="time"
                        onChange={this.onChange('startTime')}
                      />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="end"
                        id="end-time"
                        formControlProps={{
                          fullWidth: true
                        }}
                        value={this.state.endTime}
                        type="time"
                        onChange={this.onChange('endTime')}
                      />
                    </ItemGrid>
                  </Grid>
                  <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Max-time in minutes"
                        id="max-time"
                        formControlProps={{
                          fullWidth: true
                        }}
                        value={this.state.increment}
                        onChange={this.onChange('increment')}
                      />
                    </ItemGrid>
                  </Grid>
                </div>
              }
              footer={
                <Grid container justify="center">
                  <Button
                    color="primary"
                    onClick={this.storeResource}
                  >Add Resource</Button>
                </Grid>
              }
            />
          </ItemGrid>
        </Grid>
        <div className="spaceDashResources">
          {this.state.resources.map((res, i) => (
            <div key={`resources${i}`} className="spaceDashResourceBlock">
              <div className="spaceDashResourceTitle">{res.resourceName}</div>
              <div className="spaceDashResourceContact">
                {res.resourceEmail}
                <span style={{
                  marginLeft: '10px',
                  cursor: 'pointer'
                }} onClick={() => this.deleteResource(res.id, i)}>&middot; Remove</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default ResourceForm;
