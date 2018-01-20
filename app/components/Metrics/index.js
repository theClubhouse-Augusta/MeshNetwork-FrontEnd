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

/* TO DO 
    -ROW GENERATOR 
    -POSTS 
    -Re-numberfy appearances 
    ??? with appearances APIs
    
    L8R
    -selectField for year when we get there 
*/

// member joins per year
const joinsAPI = 'http://localhost:8000/api/db/Joins';

//total unique visits 
const spaceAppAPI = 'http://localhost:8000/api/db/appearances/';

//total appearances by user 
const userAppAPI = 'http://localhost:8000/api/appearance/';

//attendance by event 
const eventAppAPI = 'http://localhost:8000/api/countAppearances/eventAll/';

//const numberArrayConverter= ; 
//const convertedArraySum = ;


export default class Metrics extends React.PureComponent {
    constructor(props) {
        super(props);

        // Trying to keep the column name === the json  

        this.state = {
            eventColumns: [
                //make readable date out of eventdates
                { name: 'date', title: 'Date' },
                { name: 'title', title: 'Event Name' },
                //no idea what the appearance json keys are  
                { name: 'totalAppearances', title: 'Attendance' }
            ],
            eventRows: [
                { date: '1/2/2018', title: 'PyNight', totalAppearances: '27' },
                { date: '1/14/2018', title: '1 mil Cups' }
            ],
            userColumns: [
                { name: 'userName', title: 'Member' },
                { name: 'userAppearances', title: 'Total Visits' }
            ],
            userRows: [
                { userName: 'sally sue', userAppearances: '24' },
                { userName: 'bob bobert', userAppearances: '6' }
            ],
            memberArray: [
                "01",
                "01",
                "01",
                "01",
            ],
            memberTotal: '',
            visitsTotal: '',
            selectedYear: '',
            //year filtering may be something the lib has a space for?  
        }
    }


    //componentWillMount() {
    //this.loadMemberTotal(); 
    //this.loadVisitTotal(); 
    //this.loadUserAppearances(); 
    // this.loadEventStats(); 
    // }

    /* loadMemberTotal = () => {
      fetch(joinsAPI + this.props.id + '/' + this.state.selectedYear, {
        method: 'GET'
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        this.setState({
          memberObject:json,  
        }, function() {
          console.log(this.state.memberObject);
        })
      }.bind(this))
  } */

    /* totalMembers = () => { 
     let memberArray = this.state.memberArray; 
   
     const convertMemberArray = memberArray.split(',').map(function(member) {
       return parseInt(member, 10); 
     })
   
     function getSum () => (convertMemberArray.reduce(
       ( acc, cur ) => acc + cur, 
       0
     ); 
     console.log(getSum); 
     .then(function() {
       this.setState({
           memberTotal: getSum, 
       })
     })
     )
   } */


    /* loadVisitTotal = (props) => {
        fetch(spaceAppAPI + this.props.id, {
          method: 'GET'
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          this.setState({
           visitsTotal: json, 
          }, function() {
            console.log(this.state.visitsTotal);
          })
        }.bind(this))
    } */


    // map over user ids => appearance api 
    // make id, total pairs 
    // use users prop to render name in row 

    /*loadUserAppearances= () => {
      fetch(userAppAPI + this.props.users.id, {
        method: 'GET'
      })
      .then(function(response) {
        return response.json(); 
      })
      .then(function(json) {
        this.setState({
    
        })
      })
    }
    */


    /*loadEventStats= () => {
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
                                <p className="spaceDashCardContent">{this.state.memberTotal}</p>
                                {/* */}
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
                                <p className="spaceDashCardContent">{this.state.visitsTotal}</p>
                                {/*  */}
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
