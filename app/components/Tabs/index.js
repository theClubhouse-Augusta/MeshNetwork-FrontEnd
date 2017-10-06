/**
*
* Tabs
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class Tabs extends React.PureComponent {
  constructor(props, context){ 
    super(props, context); 
    this.state = { 
      activeTabIndex: this.props.defaultActiveTabIndex
    }; 
    this.handleClick = this.handleTabClick.bind(this); 
  }
  
  handleTabClick(tabIndex) { 
    this.setState({
      activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
    }); 
  }

  renderChildrenWithTabsApiAsProps() {
    return React.Children.map(this.props.children, (child,index) => {
      return React.cloneElement(child, {
        onClick: this.handleTabClick, 
        tabIndex: index, 
        isActive: index === this.state.activeTabIndex
      }); 
    }); 
  }

  renderActiveTabContent() { 
    const {children} = this.props; 
    const {activeTabIndex} = this.state; 
    if (children[activeTabIndex]) { 
      return children[activeTabIndex].props.children; 
    }
  }
  
  render() {
    return (
      <div className="tabsContainer"> 
        <ul className="tabsNav">                {this.renderChildrenWithTabsApiAsProps()}
        </ul>

        <div className="activeTabContent">
          {this.renderActiveTabContent }
        </div>

      </div>
    );
  }
}

Tabs.contextTypes = {
  router: React.PropTypes.object
};
