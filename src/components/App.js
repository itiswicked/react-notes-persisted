import React from 'react';

import FoldersPane from './folders/FoldersPane.js';
import NotesPane from './notes/NotesPane.js';
import NotePane from './note/NotePane.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      selectedFolderId: null,
      newFolderFieldValue: ''
    };

    this.handleFolderClick = this.handleFolderClick.bind(this);
    this.onFolderSubmit = this.onFolderSubmit.bind(this);
    this.onFolderFormChange = this.onFolderFormChange.bind(this);
  }

  onFolderSubmit(e) {
    e.preventDefault();
    if(this.state.newFolderFieldValue === '') return;

    let lastFolder = this.state.folders[this.state.folders.length - 1];
    let newId = 1;
    if(lastFolder) newId = lastFolder.id + 1;

    let newFolder = {name: this.state.newFolderFieldValue, id: newId};
    let allFolders = this.state.folders.concat(newFolder);

    this.setState({folders: allFolders});
    this.setState({selectedFolderId: newId});
    this.setState({newFolderFieldValue: ''});
  }

  onFolderFormChange(e) {
    this.setState({newFolderFieldValue: e.target.value});
  }

  handleFolderClick(e) {
    let newId = parseInt(e.target.id)
    this.setState({selectedFolderId: newId});
  }

  render() {
    let data = this.state;
    return(
      <div className="row app-wrapper">
        <FoldersPane
          folders={this.state.folders}
          selectedFolderId={this.state.selectedFolderId}
          newFolderFieldValue={this.state.newFolderFieldValue}
          handleFolderClick={this.handleFolderClick}
          onFolderSubmit={this.onFolderSubmit}
          onFolderFormChange={this.onFolderFormChange}
        />
        <NotesPane
          selectedFolderId={this.state.selectedFolderId}
          handleNoteCreate={this.handleNoteCreate}
        />
      </div>
    );
  }
}

// <NotePane />

export default App;
