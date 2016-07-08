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

  handleNoteClick(id) {
    let newId = parseInt(id);
    this.setState({selectedNoteId: newId});
  }

  updateNoteBody(noteId, noteBody) {
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

  handleNoteCreate() {
    if(!this.props.selectedFolderId) return;
    let lastNote = this.state.notes[this.state.notes.length - 1];
    let newId = 1;
    if(lastNote) newId = lastNote.id + 1;

    let newNote = {
      body: '',
      updatedAt: Date.now(),
      id: newId,
      folderId: this.props.selectedFolderId
    };

    let allNotes = this.state.notes.concat(newNote);
    this.setState({notes: allNotes});
    this.setState({selectedNoteId: newId});
  }

  deleteNote(id) {
    let newNotes = this.state.notes.filter(note => note.id !== id);
    this.setState({notes: newNotes});
    this.setState({selectedNoteId: null});
  }

  searchFilter(e){
    let searchTerm = e.target.value;
    this.setState({searchTerm: searchTerm});
  }

  filteredNoteList() {
    return this
      .state
      .notes
      .filter(note => note.folderId === this.props.selectedFolderId)
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
