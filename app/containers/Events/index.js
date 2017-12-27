/*
 *
 * Events
 *
 */
import React from 'react';
import Helmet from 'react-helmet';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
import EventHomeCalender from '../../components/EventHomeCalender'; 

import './style.css';
import './styleM.css';

export default class Events extends React.PureComponent {
  // state = {
  //   workspaces: '',
  //   workspace: '',
  //   events: '',
  // }

  // componentDidMount() {
  //   this.getSpaces();
  // }

  // getSpaces = () => {
  //   fetch(`http://localhost:8000/api/workspaces`,)
  //   .then(response => response.json())
  //   .then(Workspaces => {
  //     if (!Workspaces.error) {
  //       this.setState({	
  //         workspaces: Workspaces,
  //         workspace: Workspaces[0].name, 
  //       });
  //     }
  //   })
  //   .catch(error => {
  //     alert(`error in fetching data from server: ${error}`); // eslint-disable-line
  //   });
  // }

  // // TODO get events by selected spaceID
  // getUpcomingEvents = () => {
  //   fetch(`http://localhost:8000/api/upcoming/${'SPACEID'}`)
  //   .then(response => response.json())
  //   .then(Events => {
  //     if (Events) {
  //       this.setState({	events: Events });
  //       // NO IMAGE
  //       // "title" ,
  //       // "id" ,
  //       // "start" ,
  //       // "end" ,
  //       // "description" 
  //     }
  //   })
  //   .catch(error => {
  //     // do something with error
  //   })
  // }


  render() {
    return (
      <div className="container">
        <Helmet title="Events" meta={[ { name: 'description', content: 'Description of Events' }]}/>

        <Header />

        <main>
          <div className="eventHomeBanner"></div>
          <div className="eventHomeBody">
            <div className="eventHomeSearchSort">
              
                {/* spaces select */}

              <div className="eventHomeTagSort"></div>
            </div>

            <div className="eventHomeCalenderWrapper">
              <EventHomeCalender events={events} />
              {/* location={this.location} tags={this.selectedSkills}  */}
            </div>
          </div>      
          
        </main>

        <Footer />
      </div>
    );
  }
}

