import React from 'react';

const NewFolderForm = props => {
  return(
    <div className="new-folder-wrapper">
        <form className="new-folder-form" >
            <i
              className="fa fa-plus-circle fa-3x plus-circle"
              aria-hidden="true"
              onClick={props.onSubmit}
            ></i>
          <input
            onChange={props.onChange}
            className="new-folder-input"
            type="text"
            name="new-folder"
            placeholder="New Folder"
            value={props.value}
          ></input>
        </form>
    </div>
  );
};

export default NewFolderForm;
