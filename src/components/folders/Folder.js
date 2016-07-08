import React from 'react';

const Folder = props => {
  let wrapperClasses = "folder-row";
  let folderClasses = "folder-name";
  if (props.folder.id === props.selectedFolderId) {
    wrapperClasses = wrapperClasses + " blue-background";
    folderClasses = folderClasses + " white";
  }

  return(
    <div className={wrapperClasses} id={props.folder.id} onClick={props.handleFolderClick}>
      <i id={props.folder.id} className="fa fa-folder color-blue" aria-hidden="true"></i>
      <span id={props.folder.id} className={folderClasses}>{props.folder.name}</span>
    </div>
  );
}

export default Folder;
