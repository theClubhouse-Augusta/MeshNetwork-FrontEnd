/**
*
* Tabs
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class ExampleTabs extends React.PureComponent {

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  
  render() {
    return (
      <Tabs 
        selectedTab={this.state.selectedTab}
        onChangeTab={selectedTab => this.setState({ selectedTab })}
      >
        <Tab name="first" title="Log in" className="tabTitle">
          <div className="tabContentWrapper"> 
            <form id="loginForm">
              <p className="userFormItem"> 
                <label htmlFor="">email</label>
                <input type="email" name="" id=""/>
              </p>

              <p className="userFormItem"> 
                <label htmlFor="">confirm password</label>
                <input type="password" name="" id=""/>
              </p>

              <p id="rememberMe" className="userFormItem">                
                <input type="checkbox" name="" id=""/> 
                <label htmlFor="">remember me</label>                
              </p>

              <button type="submit" className="userFormSubmit">Submit</button>
            </form>

            <div className="forgotInfo"> 
              <a href="" className="userInfoLink">forgot email</a> 
              <a href="" className="userInfoLink">forgot password </a>  
            </div>
          </div>
        </Tab>



      <Tab name="second" title="Sign up">
        <div className="tabContentWrapper"> 
          <form id="signUpForm">  
              <p className="userFormItem"> 
                <label htmlFor="" className="userFormLabel">name</label>
                <input type="text" name="" id=""/>
              </p>
            
              <p className="userFormItem"> 
                <label htmlFor="" className="userFormLabel"> your home space</label>
                <select>
                  <option selected disabled hidden> choose a space</option>
                  <option> the Clubhou.se</option>
                  <option> Macon </option>
                </select>
              </p>

              <p className="userFormItem">  
                <label htmlFor="" className="userFormLabel">email</label>
                <input type="email" name="" id=""/>
              </p>

              <p className="userFormItem"> 
                <label htmlFor="" className="userFormLabel">password</label>
                <input type="password" name="" id=""/>
              </p>

              <p className="userFormItem"> 
                <label htmlFor="" className="userFormLabel">confirm password</label>
                <input type="password" name="" id=""/>
              </p>

                <button type="submit" className="userFormSubmit">Submit</button>
              
            </form>
          </div>
        </Tab>
      </Tabs>
    )
  }
}

function Tabs({ children, selectedTab, onChangeTab }) {
  let tabProps = []
  const content = React.Children.map(children, (child) => {
    if (child.type === Tab) {
      const { title, name } = child.props
      tabProps.push({ title, name })
      // first tab default
      if (selectedTab ? (selectedTab !== child.props.name) : (tabProps.length !== 1)) {
        return null
      }
    }
    return child
  })

  const finalSelectedTab = selectedTab || 
        (tabProps.length > 0 && tabProps[0].name)

  return (
    <div className="tabsContainer">
      <Tablist
        selectedTab={finalSelectedTab}
        onChangeTab={onChangeTab}
        tabs={tabProps}
      />
      <div className="tabsContent">
        {content}
      </div>
    </div>
  )
}

function Tablist({ tabs, selectedTab, onChangeTab }) {
  const linkClass = selected => {
    const c = 'tablistLink'
    return selected ? `${c} ${c}Selected` : c
  }
  
  return (
    <nav >
      <ul className="tabList">
        {tabs.map(({ name, title }) => 
          <li aria-selected={name === selectedTab} role="tab" key={name} className="tabLink">
            <a
              className={linkClass(name === selectedTab)}
              onClick={() => onChangeTab(name)}
             >
              {title}
             </a>
          </li>
        )}
      </ul>
    </nav>
  )
}

function Tab({ name, children }) {
  return (
    <div className="tabContent">
      {children}
    </div>
  )
}

Tabs.contextTypes = {
  router: React.PropTypes.object
};
