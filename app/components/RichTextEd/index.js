/**
*
* RichTextEd
*
*/

import React from 'react';
import {Editor, EditorState} from 'draft-js';

import './draft.css';
import './styleM.css';

export default class RichTextEd extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    return (
      <div style={{border: '1px solid black', height: '200px', margin: '0 auto', width: '70%'}}>
        <Editor  editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}

RichTextEd.contextTypes = {
  router: React.PropTypes.object
};
