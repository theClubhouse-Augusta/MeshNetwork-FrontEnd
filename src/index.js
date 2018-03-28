import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'react-dates/initialize';

import App from './containers/App';
import './app.css';
import './lms.css';
import './challenges.css';
import 'react-dates/lib/css/_datepicker.css';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
