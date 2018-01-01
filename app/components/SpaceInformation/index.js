/**
*
* SpaceInformation
*
*/

import React from 'react';
import Paper from 'material-ui/Paper'; 
import { TextField } from 'material-ui';
import Button from 'material-ui/Button';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import './style.css';
import './styleM.css';


const inputStyle = {
  border: '1px solid black', 
  marginLeft: '1em',
  maxWidth: '70%',
}


const content = 'yes hello some content'; 

export default class SpaceInformation extends React.PureComponent {
  state = {
    spaceProfile: {}, 
    editorState: EditorState.createWithContent(content), 
  }

  
   
  componentWillMount() {
    this.getSpaceInfo();
  }

 getSpaceInfo= () => {
    fetch('http://localhost:8000/api/workspace/'+ this.props.id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        spaceProfile:json
      }, function() {
        console.log(this.state.spaceProfile);
      })
    }.bind(this))
}



  render() {

    onChange = (editorState) => {
      this.setState({editorState}); 
    }

    
    return (
      <div className="spaceInfoDash">
      <Paper>
          <div className="spaceIDashHeader">
            <h2></h2>
          </div>
          <div className="spaceIDashMain">
              <form className="spaceIDashForm"> 

                <div className="spaceIDashInfoMain">  

                  <div className="spaceIDashContactInfo">
                    <p className="spaceFormItem">
                      <TextField
                        label={'Space Name'}
                        margin='normal'
                        placeholder={this.state.spaceProfile.name}
                        defaultValue={this.state.spaceProfile.name}
                        
                      />
                    </p>

                    <div className="spaceIDashContactDet">
                      <p className="spaceFormItem">
                        <TextField
                          label={'Email'}
                          margin='normal'
                          placeholder=''
                          defaultValue=''
                          
                        />
                      </p>
                      <p className="spaceFormItem">
                        <TextField
                          label={'Website'}
                          margin='normal'
                          placeholder=''
                          defaultValue=''
                          
                        />
                      </p>
                      <p className="spaceFormItem">
                        <TextField
                          label={'Phone'}
                          margin='normal'
                          placeholder=''
                          defaultValue=''
                          
                        />
                      </p>
                    </div>

                 
                  <div className="spaceIDashLocation">                    
                    <TextField
                      label={'Address'}
                      margin='normal'
                      placeholder=''
                      defaultValue=''
                      
                    />

                    <div className="spaceIDashAdd">
                      <TextField
                        label={'City'}
                        margin='normal'
                        placeholder=''
                        defaultValue=''
                        style={{maxWidth: '120px'}}
                        
                      />
                    
                      <TextField 
                       label={'State'}
                       margin='normal'
                       value=''
                       style={{maxWidth: '50px'}}
                      /> 
                      
                      <TextField
                        label={'Zipcode'}
                        margin='normal'
                        placeholder=''
                        defaultValue=''
                        style={{maxWidth: '100px'}}
                      />
                    </div>
                  </div>
                </div>   


                  <div className="spaceIDashLogo">               
                    <div> 
                      <label style={{display: 'flex', flexDirection:'column'}}>
                        Logo 
                        <Button raised component="span">
                          Upload
                          <input
                        accept="image/*"
                        style={{display: 'none'}}                   multiple
                        type="file"
                      />
                        </Button>
                      </label>
                    </div>
                    
                    <div className="spaceIDashLogoPreview">
                   
                   </div>      
                 </div>                 
                  
                </div>                  
              </form>


              <div className="spaceIDashDescription">    
                <p><label>Description</label></p>

                <Editor 
                    editorState={this.state.editorState}
                    // toolbarClassName="home-toolbar"
                    // wrapperClassName="home-wrapper"
                    // editorClassName="rdw-editor-main"
                    onEditorStateChange={this.onChange}
                    toolbar={{
                      inline: { inDropdown: true },
                      fontSize: { className: 'toolbarHidden' },
                      fontFamily: { className: 'toolbarHidden' },
                      list: { className: 'toolbarHidden' },
                      textAlign: { inDropdown: true, options: [ 'left', 'center', 'right' ] },
                      link: { inDropdown: true },
                      remove: { className: 'toolbarHidden' },
                      emoji: { className: 'toolbarHidden' },
                      history: { className: 'toolbarHidden' },
                    }}
                  /> 
              </div>
          </div>

          </Paper> 

      </div>
    );
  }
}

SpaceInformation.contextTypes = {
  router: React.PropTypes.object
};
