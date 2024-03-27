import NoteContext from "./noteContext";
import React, { useState } from "react";

const  NoteState = (props) => {
  const host = "http://localhost:5000";

  // Move import statement outside of the array
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'), // Replace with your actual auth token
      }
    });
    const json= await response.json()
    setNotes(json); 
  }
 // Add a Note
 
 const addNote = async (title, description, tag,) => {
  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: 'POST',
    headers: {
      'Accept':'*/*',
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token'), 
    },
    body: JSON.stringify({ title, description, tag }), // Fix: Pass an object to stringify
  });
  const note = await response.json();
  setNotes(notes.concat(note));
};
  // Delete a Note
    const deleteNote = async (id) => {
      // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = response.json(); 
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
    }

  // Edit a Note
  const EditNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'), // Replace with your actual auth token
      },
      body: JSON.stringify({ title, description, tag }),
    });
  
    const json = await response.json(); 

    let newNote = JSON.parse(JSON.stringify(notes))
   // Logic to edit in client
   for (let index = 0; index < newNote.length; index++) {
     const element = newNote[index];
     if (element._id === id) {
       newNote[index].title = title;
       newNote[index].description = description;
       newNote[index].tag = tag; 
       break; 
     }
   }  
   setNotes(newNote);
 }
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, EditNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;