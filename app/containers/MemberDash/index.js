/*
 *
 * MemberDash
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Paper from 'material-ui/Paper';

import Spinner from '../../components/Spinner';
import authenticate from '../../utils/Authenticate';

import './style.css';
import './styleM.css';

/* 
  items= 
    last 3 of events 
    last 3 joined
    new space 
    new comp event 
    comp event reminders

*/

const items = [
    {
        what: 'new member',
        name: 'John H.',
        verb: 'joined',
        space: 'the Clubhou.se',
        time: '1/12/2018'
    },
    {
        what: 'Event',
        name: '1000 Cups',
        verb: '@',
        space: 'the Clubhou.se',
        time: '8am 1/24/2018'
    }
]

export default class MemberDash extends React.PureComponent {
    state = {
        loading: true,
    };
    async componentWillMount() {
        const authorized = await authenticate(localStorage['token'], this.props.history);
        if (!authorized.error) {
            this.setState({ loading: false });
        } else {
            this.props.history.push('/');
        }
    }
    render() {
        const dashItems = items.map((item) => (
            <Paper>
                <div className="dashboardItem">
                    <span> {item.what} </span>
                    <div>
                        <span> {item.name} </span>
                        <span> {item.verb} </span>
                        <span> {item.space}</span>
                    </div>
                    <span> {item.time} </span>
                </div>
            </Paper>
        ))

        return (
            this.state.loading
                ?
                <Spinner loading={this.state.loading} />
                :
                <div className="container">
                    <Helmet title="MemberDash" meta={[{ name: 'description', content: 'Description of MemberDash' }]} />
                    <Header />
                    <main>
                        <div className="dashBanner">
                        </div>
                        <div className="dashNavBar">
                            <ul className="dashNav">
                                <li><a href="/addevent">new event</a></li>
                                <li><a href="/memberSearch">member search</a></li>
                                <li><a href="">business search </a></li>
                                <li><a href="/booking">booking</a></li>
                            </ul>
                        </div>

                        <div className="dashBody">
                            <div className="dashUserInfo">
                                <div className="dashUpcomingEvents">
                                    <h3 style={{ textAlign: 'center' }}> Upcoming </h3>
                                    <div className="dashEventBlock">
                                        <p className="dashEvent">Wed. Dec 6th, 8a - One Million Cups</p>
                                    </div>
                                    <div className="dashEventBlock">
                                        <p className="dashEvent">Wed. Dec 15th - Beer & Bytes </p>
                                    </div>
                                    <div className="dashEventBlock">
                                        <p className="dashEvent">Fri. Dec 15th - PyAugusta</p>
                                    </div>
                                </div>

                                <div className="dashYourSpace">
                                    <img src='https://theclubhou.se/wp-content/uploads/2017/04/theclubhouselogo-1.png' height="100px" width="100px" className="dashSpaceLogo" />
                                    <div className="dashSpaceQuickLinks">
                                        <ul>
                                            <li className="dashSpaceLink"><a href="https://theclubhou.se/join/" >manage membership</a></li>
                                            <li className="dashSpaceLink"><a href="mailto:heythere@theclubhou.se" >heythere@theclubhou.se</a></li>
                                            <li className="dashSpaceLink"><a href="http://theclubhou.se" >http://theclubhou.se</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="dashUserNetworkInfo">
                                <Paper><div className="dashSpaceNews">
                                    <p className="dashAnnouncement"> the Clubhou.se will be closed Nov 22 - 25 - Have a safe Thanksgiving!</p>
                                </div></Paper>

                                <div className="dashDashboard">
                                    {dashItems}
                                </div>

                            </div>

                        </div>
                    </main>
                    <Footer />
                </div>
        );
    }
}
