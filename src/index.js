import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './app.css';
import './challenges.css';
import App from './containers/App';
import './lms.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
