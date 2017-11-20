/*
 *
 * AddCompEvent
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 
import LocationSelect from 'components/LocationSelect'; 
import DateTimeSelect from 'components/DateTimeSelect'; 
import RichTextEd from 'components/RichTextEd'; 
import FileUploader from 'components/FileUploader'; 
import TagSearch from 'components/TagSearch'; 
import TagSelect from 'components/TagSelect'; 
import RaisedButton from 'material-ui/RaisedButton'; 
import Snackbar from 'material-ui/Snackbar';

import './style.css';
import './styleM.css';

export default class AddCompEvent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div className="container">
        <Helmet title="AddEvent" meta={[ { name: 'description', content: 'Description of AddEvent' }]}/>
        <Header />

        <main>
          <div className="compEventBanner">
          </div>
     
          <div className="compEventBody">
            <div className="compEventContent">
              <div className="compEventTitle"> 
                <h2> Submit A Comprehensive Event </h2> 
              </div>   

              <div className="compEventInstructions">
                <p> a bunch of submission instructions & stuff</p>

                <div className="compEventFAQ">
                  <h4 style={{marginTop: '3em'}}> what is a comprehensive event?</h4>

                  <ul className="compEventDesList"> 
                    <li className="listItemReset">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                    <li className="listItemReset">Maecenas mollis, turpis ut malesuada sodales, ex purus suscipit augue, quis viverra felis leo quis diam.</li>
                    <li className="listItemReset">Ut congue ex dolor, ut semper odio viverra nec.</li>
                    <li className="listItemReset">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vulputate ultrices tortor a egestas. Morbi cursus placerat nibh, sed finibus quam molestie tincidunt. </li>
                  </ul>               
              </div> 
              </div> 

          </div> 

            <div className="compEventForm"> 
              <p className="compEventFormItem"> 
                <label htmlFor="">Event name</label>
                <input type="text" name="" id="event name" style={{border: '1px solid black', width: '65%' }}/>
              </p>

              <p className="addEventFormItem"  style={{flexDirection: 'column'}}> 
                <label htmlFor="" style={{textAlign: 'justify', width: '60%'}}> Add any relevant outside URL </label>
                <p style={{marginBottom: '1em'}}><small>(such as Github repo or official challenge page)</small></p> 
                <input type="text" name="" id="event outside url" style={{border: '1px solid black', width: '70%' }}/>
              </p>
              
              <div className="compEventLocationSelect"> 
                <label className="compEventFormLabel"> Select Locations to Include </label>
                
                <div className="compEventLocationsContainer">
                  <LocationSelect /> 
                </div>
              </div> 

              <div className="compEventDateTime"> 
                <label className="compEventFormLabel">Choose a date & time </label>
                <DateTimeSelect style={{display: 'flex', flexDirection: 'column', alignItems: 'space-around'}}/> 
              </div>              

              <div className="compEventDesContainer">
                <label className="compEventFormLabel"> Event Description</label>
                <RichTextEd />
              </div>
             
              <div className="compEventFileUpload"> 
                <label className="compEventFormLabel"> Upload any supporting documentation such as: proposals, logos, detailed challenge topics </label>
                
                <div className="compEventUploadContainer">
                  <FileUploader />
                </div>
              </div> 

              <div className="compEventTagContainer">                 
                <label className="compEventFormLabel"> Pick the topics that best describe your event </label>

                <div className="compEventTagWrapper">
                  <TagSearch />
                  <TagSelect /> 
                </div>
              </div> 
              
              <div className="compEventSubmit">
              <RaisedButton label="Submit" className="compEventSubmitButton" onClick={this.handleTouchTap} /> 
              <Snackbar
                open={this.state.open}
                message="Thanks, your event has been submitted for approval"
               autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
              />
              </div>
             
            </div> 
          </div>          
        </main>  

        <Footer />
      </div>
    );
  }
}

AddCompEvent.contextTypes = {
  router: React.PropTypes.object
};
