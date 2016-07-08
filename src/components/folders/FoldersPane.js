import React from 'react';

import FolderList from './FolderList';
import NewFolderForm from './NewFolderForm';

const FoldersPane = props => {
  return(
    <div className="small-4 columns folders-pane">
      <FolderList
        folders={props.folders}
        selectedFolderId={props.selectedFolderId}
        handleFolderClick={props.handleFolderClick}
      />
      <NewFolderForm
        onSubmit={props.onFolderSubmit}
        onChange={props.onFolderFormChange}
        value={props.newFolderFieldValue}
      />
    </div>
  );
};

export default FoldersPane;
