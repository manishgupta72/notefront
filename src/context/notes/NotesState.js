import NoteContext from './notescontext'
import React, { useState } from 'react'
const NotesState = (props) => {

  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)
  //fetch  all notes
  const getNotes = async () => {
    //Todo: Api call 
    //Api call
    const response = await fetch(`https://inotebookback-hajz.onrender.com/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });
    const json = await response.json();
    console.log(json)
    setnotes(json)
    console.log(notes);
  }
  //add note
  const addNote = async (title, description, tag) => {
    //Todo: Api call 
    //Api call
    const response = await fetch(`https://inotebookback-hajz.onrender.com/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });
    const json = await response.json();
    console.log(json)

    console.log("Adding a new note")
    const note = {
      title: title,
      description: description,
      tag: tag
    }
    setnotes(notes.concat(note))

  }
  //delete note
  const deleteNote = async (id) => {
    //api call
   const response= await fetch(`https://inotebookback-hajz.onrender.com/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    const json=response.json();
    console.log("🚀 ~ file: NotesState.js:61 ~ deleteNote ~ json:", json)
    console.log("deleting a note with  id")
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setnotes(newNotes)
  }
  //edit note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`https://inotebookback-hajz.onrender.com/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });
    const json = response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setnotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>

  )
}
export default NotesState;