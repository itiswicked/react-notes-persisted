import React from 'react';

const NoteListItem = props => {
  let title;
  if(props.body === '') {
    title = 'New Note'
  } else {
    if(props.body.length > 35) {
      title = props.body.substring(0, 32) + " ...";
    } else {
      title = props.body
    }
    title = title.split("\n")[0]
  }

  let date = new Date(props.updatedAt)
  let formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
  let onClick = () =>  props.handleNoteClick(props.id);

  return(
    <article className={props.noteClasses} onClick={onClick}>
      <span><strong>{title}</strong></span>
      <span>{formattedDate}</span>
    </article>
  )
}

export default NoteListItem;
