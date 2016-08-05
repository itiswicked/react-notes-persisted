import React from 'react';
import DebounceInput from 'react-debounce-input';

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
    let body = "";
    let updatedAt;
    let deleteButton = <div></div>;
    if(this.state.note) {
      body = this.state.note.body;
      updatedAt = `Updated ${this.state.note.updated_at}`
      deleteButton = <button onClick={this.handleNoteDelete} className="my-button">Delete</button>;
    }

    return(
      <div className="small-4 columns note-pane">
        <div className="note-topbar">
          <span className="updated-at"><strong>{updatedAt}</strong></span>
          <div className="button-wrapper">
            {deleteButton}
          </div>
        </div>
        <div className="note-body">
          <DebounceInput
            className="note-edit-area"
            minLength={2}
            debounceTimeout={1000}
            element="textarea"
            value={body}
            onChange={this.handleNoteUpdate}
          />
        </div>
      </div>
    );
  }
};

export default NotePane;
