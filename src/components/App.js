import React from 'react';

import FoldersPane from './folders/FoldersPane.js';
import NotesPane from './notes/NotesPane.js';
import NotePane from './note/NotePane.js';
import 'whatwg-fetch';

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

  componentWillMount() {
    fetch('http://localhost:4567/folders.json')
      .then(response => response.json())
      .then(json => {
        this.setState({folders: json.folders})
        this.setState({selectedFolderId: json.folders[0].id})
      })
      .catch(error => console.error("Error in GET /folders.json: ", error))
  }

  onFolderSubmit(e) {
    e.preventDefault();
    if(this.state.newFolderFieldValue === '') return;

    fetch("http://localhost:4567/folders.json", {
      method: 'POST',
      body: JSON.stringify({
        folder: {
          name: this.state.newFolderFieldValue
        }
      })
    })
    .then(response => response.json())
    .then(json => {
      let newFolder = json.folder
      let allFolders = this.state.folders.concat(newFolder);
      this.setState({folders: allFolders});
      this.setState({newFolderFieldValue: ''});
      this.setState({selectedFolderId: newFolder.id});
    })
    .catch(error => console.error("Error in POST /folders.json: ", error));
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
        <NotesPane selectedFolderId={this.state.selectedFolderId} />
      </div>
    );
  }
}

export default App;
