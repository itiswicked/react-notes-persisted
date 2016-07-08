import React from 'react';

const NotesTopBar = props => {
  return(
    <div className="notes-topbar">
      <button className="my-button" onClick={props.handleNoteCreate}>
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        <span> New Note</span>
      </button>
      <form className="search-form">
        <input
          onChange={props.searchFilter}
          className="fa search-field"
          type="text"
          placeholder="&#xf002; Search"
        />
      </form>
    </div>
  );
};

export default NotesTopBar;
