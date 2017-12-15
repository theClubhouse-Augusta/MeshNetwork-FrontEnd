/*
 *
 * KioskSystem
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Select from 'react-select';
import KioskFlowTwo from 'components/KioskFlowTwo'; 
import KioskUpcomingEvents from 'components/KioskUpcomingEvents'; 

import './style.css';
import './styleM.css'
import 'react-select/dist/react-select.css';;

const menuWrapperStyle = {
  margin: '0 auto',
}



export default class KioskSystem extends React.PureComponent {
  state= {
    selectedOption: '', 
  }

  handleNameInputChange = (selectedOption) => {
    this.setState({ selectedOption }); 
    // handleFlowTwo(userObject)
  }

  handleFlowTwo = () => {
    //render FlowTwo on page
 }
 
 

  render() {
    return (
      <div className="kioskContainer">
        <Helmet title="KioskSystem" meta={[ { name: 'description', content: 'Description of KioskSystem' }]}/>

        <main> 
          <div className="kioskBody">
            <div className="kioskLogoBlock">
              <div className="kioskLogoWrapper"></div>
            </div>

            <div className="kioskFormContainer">
             
             
               <div className="kioskAutoWrapper">
                 <Select 
                  name="form-field-name"
                  value={this.state.selectedOption.value}
                  placeholder="Find yourself ☮"
                  arrowRenderer={null} 
                  clearable={true}           
                  openOnClick={false}
                  onChange={this.handleNameInputChange} 
                  options={[
                    { value: '1', label: 'Audora'},
                    { value: '2', label: 'Ivy'},
                    { value: '3', label: 'Nadeem'}
                  ]}
                  
                  wrapperStyle={menuWrapperStyle}
                  
                />
              </div>     

                {/* <KioskFlowTwo />*/}
              
                
               {/*
               <div className="kioskUserName">
              Thanks Name! 
             </div>
              <KioskUpcomingEvents />
               
              Switch with just name really nice */}
              
              
            </div>          
          </div> 

          <div className="kioskRedirectNav">
              <small> <a href="/home"> mesh network home </a></small>
          </div>         
        </main>
      </div>
    );
  }
}

KioskSystem.contextTypes = {
  router: React.PropTypes.object
};
