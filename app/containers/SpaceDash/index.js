
/*
 *
 * SpaceDash
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Metrics from 'components/Metrics';
import SpaceInformation from 'components/SpaceInformation';

import { AppearanceByMonthYear } from '../../components/DataViz/AppearanceByMonthYear';
import { AllAppearances } from '../../components/DataViz/AllAppearances';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import FlatButton from 'material-ui/Button';

import Header from 'components/Header';

import './style.css';
import './styleM.css';

const getUsersAPI = 'https://innovationmesh.com/api/getSpaceUsers/';

const spaceInfoAPI = 'https://innovationmesh.com/api/workspace/';

export default class SpaceDash extends React.PureComponent {
  state ={
    activeMenu: 0,
    spaceUsers: [],
    spaceDescription:'',
    memberCount:0,
    eventCount:0,
    checkinCount:0,
    spaceEvents:[]
  }

  componentWillMount() {
    this.loadSpaceDescription();
  }

  loadSpaceUsers = (id) => {
    fetch( getUsersAPI + id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        spaceUsers:json
      }, function() {
        console.log(this.state.spaceUsers)
      })
    }.bind(this))
  }

  loadSpaceDescription = () => {
    fetch(spaceInfoAPI + this.props.match.params.id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        spaceDescription: json.description,
      }, function() {
        this.loadSpaceUsers(json.id);
        this.getSpaceStats(json.id);
        this.getSpaceEvents(json.id);
      })
    }.bind(this))
  }

  getSpaceStats = (id) => {
    fetch('https://innovationmesh.com/api/getSpaceStats/'+id, {
      method:'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        memberCount:json.memberCount,
        eventCount:json.eventCount,
        checkinCount:json.checkinCount
      })
    }.bind(this))
  }

  getSpaceEvents = (id) => {
    fetch('https://innovationmesh.com/api/getDashboardEvents/'+id, {
      method:'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        spaceEvents:json.data
      })
    }.bind(this))
  }

  changeMenu = (id) => {
    this.setState({
      activeMenu:id
    })
  }

  renderDashContent = () => {
    if(this.state.activeMenu === 0) {
      return(
        <div className="spaceDashContent">
          <Header/>
          <div className="spaceDashDataRow">
            <div className="spaceDashDataBlock">
              <div className="spaceDashDataTitle">Members</div>
              <div className="spaceDashDataContent">{this.state.memberCount}</div>
            </div>
            <div className="spaceDashDataBlock">
              <div className="spaceDashDataTitle">Events</div>
              <div className="spaceDashDataContent">{this.state.eventCount}</div>
            </div>
            <div className="spaceDashDataBlock">
              <div className="spaceDashDataTitle">Check-Ins</div>
              <div className="spaceDashDataContent">{this.state.checkinCount}</div>
            </div>
            <div className="spaceDashDataBlock">
              <div className="spaceDashDataTitle">Visits</div>
              <div className="spaceDashDataContent">500</div>
            </div>
          </div>
          <div className="spaceDashMetricsContainer">
          {/*<AllAppearances height={600} width={600} {...this.props}  />
          <AppearanceByMonthYear {...this.props} />*/}
          </div>
          <div className="spaceDashOptions">
            <Link to={'/addEvent'} style={{width:'10%', margin:'10px'}}><FlatButton style={{width:'100%', background:'#ff4d58', paddingTop:'10px', paddingBottom:'10px',color:'#FFFFFF', fontWeight:'bold'}}>Add an Event</FlatButton></Link>
          </div>
          <div className="spaceDashColumnsContainer">
            <div className="spaceDashColumn">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell>Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.spaceUsers.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
            <div className="spaceDashColumn">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Start Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.spaceEvents.map((e, i) => (
                    <TableRow>
                      <TableCell>{e.title}</TableCell>
                      <TableCell>{e.space.city}, {e.space.state}</TableCell>
                      <TableCell>{e.date.start}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )
    }
    else if(this.state.activeMenu === 1) {
      return(
        <div className="spaceDashContent">
          <Header/>
          <SpaceInformation  id={this.props.match.params.id} description={this.state.spaceDescription}/>
        </div>
      )
    }
  }

  render() {
    const { value } = this.state;

    return (
      <div className="container">
      <Helmet title="Space Dashboard" meta={[ { name: 'description', content: 'Description of SpaceDashboard' }]} />

      <header>

      </header>

      <main className="spaceDashMain">
        <div className="spaceDashMenu">
          <div className="spaceDashMenuItem" onClick={() => this.changeMenu(0)}>Dashboard</div>
          <div className="spaceDashMenuItem" onClick={() => this.changeMenu(1)}>Space Information</div>
        </div>
        {this.renderDashContent()}

      </main>
      </div>
    );
  }
}

SpaceDash.contextTypes = {
  router: PropTypes.object
};
