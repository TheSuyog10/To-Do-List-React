// App.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Bottom } from "./components/Bottom";
import { nanoid } from "nanoid";
import { TodoProvider, useTodo } from "./TodoContext";
import "./App.css";

function App() {
  const { notes, addNote, toggleNote, deleteNote, updateNotes } = useTodo();
  const [noteText, setNoteText] = React.useState("");
  const [message, setMessage] = React.useState("");

  const add = () => {
    if (noteText === "") {
      setMessage(
        <span>
          <FontAwesomeIcon icon={faTriangleExclamation} /> Empty Fields
        </span>
      );

      setTimeout(() => {
        setMessage("");
      }, 1000);
    } else {
      const newNote = {
        id: nanoid(),
        text: noteText,
        isDone: false,
      };
      addNote(newNote);
      setNoteText("");
    }
  };

  const handleEdit = (id, editedText) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: editedText } : note
    );

    updateNotes(updatedNotes);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      add();
    }
  };

  return (
    <div className="container">
      <div className="to-do">
        <h2>
          To-Do List{" "}
          <FontAwesomeIcon
            icon={faClipboardList}
            style={{
              marginLeft: "5px",
            }}
          />
        </h2>
        <span className="message">{message}</span>
        <div className="searchBox">
          <input
            className="searchInput"
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter Your Text"
            onKeyPress={handleKeyPress}
          />
          <button className="searchButton" onClick={add}>
            Add
          </button>
        </div>
        <ul id="list-container">
          {notes.map((note) => (
            <Bottom key={note.id} id={note.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
