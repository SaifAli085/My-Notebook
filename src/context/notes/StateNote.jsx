import NoteContext from "./noteContext";
import { useState } from "react";

const StateNote = (props) => {
  const host = "http://localhost:3001";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/note/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add a Note
  const AddNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Add a Delete
  const DeleteNote = async (id) => {
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    // API Call
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
  };
  // Add a Update
  const UpdateNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
      setNotes(newNotes);
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, AddNote, DeleteNote, UpdateNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default StateNote;
