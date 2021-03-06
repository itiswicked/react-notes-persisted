import React from 'react';
import update from 'react-addons-update';

import NotesTopBar from './NotesTopBar';
import NoteListItem from './NoteListItem';
import NotePane from './../note/NotePane';

class NotesPane extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      selectedNoteId: null,
      searchTerm: ""
    };

    this.handleNoteCreate = this.handleNoteCreate.bind(this);
    this.handleNoteClick = this.handleNoteClick.bind(this);
    this.updateNoteBody = this.updateNoteBody.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { selectedFolderId } = nextProps;
    if(selectedFolderId) {
      fetch(`http://localhost:4567/folders/${selectedFolderId}/notes.json`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        let notes = json.notes;
        this.setState({notes: notes})
        if(notes.length > 0) {
          let firstNoteId = notes[0].id;
          this.setState({selectedNoteId: firstNoteId})
        }
      })
      .catch(error => console.error("Error in fetch GET /notes.json", error));
    }
  }

  handleNoteClick(id) {
    let newId = parseInt(id);
    this.setState({selectedNoteId: newId});
  }

  updateNoteBody(noteId, noteBody) {
    fetch(`http://localhost:4567/notes/${noteId}.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        note: {
          body: noteBody,
        }
      })
    })
    .then(response => {
      if (response.ok) {
        let currentNotes = this.state.notes;
        let noteIndex = currentNotes.findIndex(note => note.id === noteId);

        let updatedNote = update(
          this.state.notes[noteIndex],
          { body: {$set: noteBody} }
        );

        let newNotes = update(
          currentNotes,
          { $splice: [[noteIndex, 1, updatedNote]] }
        );

        this.setState({notes: newNotes});
      }
    })
    .catch(error => console.error("Error in PATCH /notes/:id.json ", error))
  }

  handleNoteCreate() {
    if(!this.props.selectedFolderId) return;
    let folder_id = this.props.selectedFolderId

    let newNote = {
      body: 'New Note',
      folder_id: folder_id
    };

    fetch(`http://localhost:4567/folders/${folder_id}/notes.json`, {
        method: 'POST',
        body: JSON.stringify({note: newNote})
    })
    .then(response => response.json())
    .then(json => {
      let newNote = json.note;
      let newNotes = this.state.notes.concat(newNote);
      this.setState({notes: newNotes});
      this.setState({selectedNoteId: newNote.id});
    })
    .catch(error => console.error('Error in POST /folders/:folder_id/notes.json', error));
  }

  deleteNote(id) {
    fetch(`http://localhost:4567/notes/${id}.json`, {method: 'DELETE'})
    .then(response => {
      if(response.ok) {
        let { notes } = this.state;
        let oldNoteIndex = notes.findIndex(note => note.id === id);
        let newNotes = notes.filter(note => note.id != id);

        let previousNote = notes[oldNoteIndex - 1]
        let nextNote = notes[oldNoteIndex + 1]

        this.setState({notes: newNotes})
        if(previousNote) {
          this.setState({selectedNoteId: previousNote.id});
        } else if (nextNote) {
          this.setState({selectedNoteId: nextNote.id});
        } else {
          this.setState({selectedNoteId: null});
        }
      }
    })
    .catch(error => console.error(error))
  }

  searchFilter(e){
    let searchTerm = e.target.value;
    this.setState({searchTerm: searchTerm});
  }

  filteredNoteList() {
    return this
      .state
      .notes
      .filter(this.bySearchTerm.bind(this))
      .map(this.createNoteListNode.bind(this));
  }

  bySearchTerm(note) {
    if(this.state.searchTerm.length > 0) {
      return note.body.indexOf(this.state.searchTerm) > -1;
    } else {
      return true;
    }
  }

  createNoteListNode(note) {
    let klasses = "notespane-note";
    if(note.id === this.state.selectedNoteId) klasses = klasses + " highlight";
    return(
      <NoteListItem
        noteClasses={klasses}
        {...note}
        key={note.id}
        handleNoteClick={this.handleNoteClick}
      />
    );
  }

  currentNote() {
    return this
      .state
      .notes
      .filter(note => note.id === this.state.selectedNoteId)[0];
  }

  render() {
    return(
      <div>
        <div className="small-4 columns notes-pane">
          <NotesTopBar
            handleNoteCreate={this.handleNoteCreate}
            searchFilter={this.searchFilter}
          />
          <div className="note-list">
            {this.filteredNoteList()}
          </div>
        </div>
        <NotePane
          deleteNote={this.deleteNote}
          updateNoteBody={this.updateNoteBody}
          note={this.currentNote()}
          handleNoteUpdate={this.handleNoteUpdate}
        />
      </div>
    );
  }
}

export default NotesPane;
