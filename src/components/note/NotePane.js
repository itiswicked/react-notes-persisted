import React from 'react';

import NoteTopBar from './NoteTopBar';

class NotePane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.note
    };
    this.handleNoteUpdate = this.handleNoteUpdate.bind(this);
    this.handleNoteDelete = this.handleNoteDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({note: nextProps.note});
  }

  handleNoteUpdate(e) {
    if(!this.state.note) return;
    this.props.updateNoteBody(this.state.note.id, e.target.value);
  }

  handleNoteDelete() {
    this.props.deleteNote(this.state.note.id);
  }

  render() {
    let body;
    let updatedAt;
    if(this.state.note) {
      body = this.state.note.body;
      updatedAt = this.state.note.updated_at
    }

    return(
      <div className="small-4 columns note-pane">
        <div className="note-topbar">
          <span className="updated-at"><strong>Updated{updatedAt}</strong></span>
          <div className="button-wrapper">
            <button className="my-button">Update</button>
            <button onClick={this.handleNoteDelete} className="my-button">Delete</button>
          </div>
        </div>
        <div className="note-body">
          <textarea
            className="note-edit-area"
            onChange={this.handleNoteUpdate}
            value={body}
          />
        </div>
      </div>
    );
  }
};

export default NotePane;
