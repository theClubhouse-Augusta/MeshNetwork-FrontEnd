/*
 *
 * LearningDetail
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header'; 
import Footer from 'components/Footer'; 

import './style.css';
import './styleM.css';

export default class LearningDetail extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="LearningDetail" meta={[ { name: 'description', content: 'Description of LearningDetail' }]}/>

        <Header />
        
        <div className="classBanner"> 
          <div className="classHeadingImage"> 
                { /* global css classes from 'parent' container */ }               
          <h1 className="classTitle"> Startup Bootcamp</h1>             
        </div>


        <div className="classBody"> 
           
          <div className="classLocation">            
            <h3 className="classSpaceName"> the Clubhou.se</h3>
            <h3 className="classDate">04/25/2018</h3>
          </div>

          <section className="classDetail">
                <p> Jump off balcony, onto stranger's head leave fur on owners clothes, or why must they do that, yet flee in terror at cucumber discovered on floor. Caticus cuteicus sleep in the bathroom sink and hiss at vacuum cleaner yet lay on arms while you're using the keyboard pelt around the house and up and down stairs chasing phantoms. Proudly present butt to human eats owners hair then claws head your pillow is now my pet bed. Poop in litter box, scratch the walls Gate keepers of hell. Spill litter box, scratch at owner, destroy all furniture, especially couch pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now you call this cat food and mew thinking longingly about tuna brine.</p>

                <div className="classRegisterBlock"> 
                  <button className="classRegisterButton"> Register </button>
                  <h4 className="classPrice"> $99 </h4>
                </div>
              </section>
            </div>

          </div> 
        <Footer />
       
      </div>
    );
  }
}
