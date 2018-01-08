/**
*
* Metrics
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
 
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';


import './style.css';
import './styleM.css';


const joinsAPI = 'http://localhost:8000/api/db/Joins/'
const spaceAppAPI= 'http://localhost:8000/api/db/appearances/';
const userAppAPI= 'http://localhost:8000/api/appearance/';
const eventAppAPI = 'http://localhost:8000/api/countAppearances/'; 


export default class Metrics extends React.PureComponent {
  constructor(props) {
    super(props); 

// Trying to keep the column name === the json  
  
  this.state = {
      eventColumns: [
        //make readable date out of eventdates
        {name: 'date', title:'Date'}, 
        {name: 'title', title: 'Event Name'},
        //no idea what the appearance json keys are  
        {name:'totalAppearances', title:'Attendance'}
      ], 
      eventRows: [
        {date: '1/2/2018', title: 'PyNight', totalAppearances: '27'}, 
        {date: '1/14/2018', title: '1 mil Cups'}
      ], 
      userColumns: [
        {name: 'userName', title:'Member'}, 
        {name: 'userAppearances', title: 'Total Visits'}
      ], 
      userRows: [
        {userName: 'sally sue', userAppearances: '24'}, 
        {userName: 'bob bobert', userAppearances: '6'}
      ], 
      memberTotal: '', 
      visitsTotal: '',
      selectedYear: '', 
      //year filtering may be something the lib has a space for?  
      spaceMembers: [], 
    }
  }

/*  componentWillMount() {
    this.loadMemberTotal(); 
    this.loadVisitTotal(); 
    this.loadUserAppearances(); 
    this.loadEventStats(); 
  }

  loadMemberTotal = (props) => {
    fetch(joinsAPI + this.props.id + '/' + this.state.selectedYear{
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => this.setState ({
      memberTotal: json
    }, function() {
      console.log(this.state.memberTotal); 
    }))
  }

  loadVisitTotal = (props) => {
    fetch(spaceAppAPI + this.props.id {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => this.setState({
      visitsTotal: json
    }, function () { 
      console.log(this.state.visitsTotal); 
    } 
  ))
  }

  loadUserAppearances= () => {
  
  }

  loadEventStats= () => {
    fetch(eventAppAPI)
  }
*/

  render() {
    const { eventColumns, eventRows, userColumns, userRows } = this.state;  

    return (
      <div className="spaceDashMetricsContainer">
        
        <div className="spaceDashMetricsCounts">
          <div className="spaceDashMetricsJoins"> 
            <Card className="spaceDashCard">
              <CardHeader 
                title="Total Members"
                className="spaceDashCardHeader"
              />
              <CardContent>
                <p className="spaceDashCardContent">82</p>
               {/* {this.state.memberTotal}*/}
              </CardContent>
            </Card>
          </div>

          <div className="spaceDashMetricsVisits">
            <Card className="spaceDashCard">
              <CardHeader 
                title="Unique Visits"
                className="spaceDashCardHeader"
              />
              <CardContent>
              <p className="spaceDashCardContent">897</p>
               {/* {this.state.visitsTotal} */} 
              </CardContent> 
            </Card>
          </div>      
        </div>
      
        <div className="spaceDashMetricsCharts">
          <div className="spaceDashEventChart">
            <h3 className="spaceDashChartName">Event Attendence</h3>
            <Paper> 
            <Grid
              rows={eventRows}
              columns={eventColumns}> 
              <Table />
              <TableHeaderRow />
            </Grid>
          </Paper>
          </div>
          <div className="spaceDashUserChart">
            <h3 className="spaceDashChartName">Member Visits</h3> 
            <Paper> 
              <Grid
                rows={userRows}
                columns={userColumns}> 
                <Table />
                <TableHeaderRow />
              </Grid>
            </Paper>
          </div>     
        </div>
      
      </div>
    );
  }
}

Metrics.contextTypes = {
  router: PropTypes.object
};
