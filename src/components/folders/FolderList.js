import React from 'react';

import Folder from './Folder';

const FolderList = props => {
  let folders = props.folders.map(folder => {
    return(
      <Folder
        key={folder.id}
        folder={folder}
        selectedFolderId={props.selectedFolderId}
        handleFolderClick={props.handleFolderClick}
      />
    );
  });

  return(
    <div className="folder-list">
      {folders}
    </div>
  );
};

export default FolderList;
