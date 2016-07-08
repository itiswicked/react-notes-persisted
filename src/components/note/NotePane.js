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
    if(this.state.note) {
      let date = new Date(this.state.note.updatedAt);
      let formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
      var updatedOn = "Updated on " + formattedDate;
    }

    return(
      <div className="small-4 columns note-pane">
        <div className="note-topbar">
          <span className="updated-at"><strong>{updatedOn || ""}</strong></span>
          <div className="button-wrapper">
            <button className="my-button">Update</button>
            <button onClick={this.handleNoteDelete} className="my-button">Delete</button>
          </div>
        </div>
        <div className="note-body">
          <textarea
            className="note-edit-area"
            onChange={this.handleNoteUpdate}
            value={this.state.note ? this.state.note.body : ""}
          />
        </div>
      </div>
    );
  }
};

export default NotePane;
