/*
 *
 * AddEvent
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import UserSelect from 'components/UserSelect'; 
import DateTimeSelect from 'components/DateTimeSelect'; 
import RichTextEd from 'components/RichTextEd'; 
import TagSelect from 'components/TagSelect'; 

import './style.css';
import './styleM.css';

export default class AddEvent extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="AddEvent" meta={[ { name: 'description', content: 'Description of AddEvent' }]}/>
        <Header />

        <main>
          <div className="addEventBanner">
          </div>
     
          <div className="addEventBody">
            <div className="addEventTitle"> 
              <h2> Submit An Event </h2> 
              <p> a bunch of submission instructions & stuff</p>
            </div>   

            <form className="addEventForm"> 
              <p className="userFormItem" style={{border: '1px solid green'}}> 
                <label htmlFor="">Event name</label>
                <input type="text" name="" id="event name"/>
              </p>
              
              <div style={{border: '1px solid green'}}> 
              <UserSelect /> 
              </div> 

              <div style={{border: '1px solid green'}}> 
              <DateTimeSelect /> 
              </div>              

              <RichTextEd />

              <div style={{border: '1px solid green'}}> 
              <TagSelect /> 
              </div> 
              

            </form> 
          </div>          
        </main>  

        <Footer />

      </div>
    );
  }
}
