import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';

import Home from 'containers/Home';
import About from 'containers/About';
import BookingSystem from 'containers/BookingSystem';
import BusinessSearch from 'containers/BusinessSearch';
import Contact from 'containers/Contact';
import EventDetail from 'containers/EventDetail';
import Events from 'containers/Events';
import Spaces from 'containers/Spaces';
import Sponsors from 'containers/Sponsors';
import LearningHome from  'containers/LearningHome';
import LearningDetail from  'containers/LearningDetail';
import LogInSignUp from 'containers/LogInSignUp';
import MemberSearch from 'containers/MemberSearch';
import NewEvent from 'containers/NewEvent';
import SpaceProfile from 'containers/SpaceProfile';
import UserProfile from 'containers/UserProfile';
import NotFound from 'containers/NotFound';

ReactDOM.render((
  <BrowserRouter>
  <MuiThemeProvider>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/About' component={About}/>
      <Route path='/Booking' component={BookingSystem}/>
      <Route path='/BusinessSearch' component={BusinessSearch}/>
      <Route path='/Contact' component={Contact}/>
      <Route path='/EventDetail' component={EventDetail}/>
      <Route path='/Events' component={Events}/>
      <Route path='/Sponsors' component={Sponsors}/>
      <Route path='/Spaces' component={Spaces}/>
      <Route path='/Learning' component={LearningHome}/>
      <Route path='/detail' component={LearningDetail}/>
      <Route path='/Auth' component={LogInSignUp}/>
      <Route path='/MemberSearch' component={MemberSearch}/>
      <Route path='/NewEvent' component={NewEvent}/>
      <Route path='/SpaceProfile' component={SpaceProfile}/>
      <Route path='/UserProfile' component={UserProfile}/>
      <Route path='*' component={NotFound}/>
    </Switch>
    </MuiThemeProvider>
  </BrowserRouter>
), document.getElementById('app'));

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
