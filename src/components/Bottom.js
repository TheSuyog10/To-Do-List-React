// Bottom.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faEdit,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import "../App.css";
import { useTodo } from "../TodoContext";

export const Bottom = ({ id }) => {
  const { notes, toggleNote, deleteNote, updateNotes } = useTodo();
  const note = notes.find((note) => note.id === id);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(note.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedNotes = notes.map((n) =>
      n.id === id ? { ...n, text: editedText } : n
    );
    updateNotes(updatedNotes);
    setIsEditing(false);
  };

  return (
    <div className="to-do-item">
      <ul>
        <li className={note.isDone ? "done" : ""}>
          <div className="left-section">
            {note.isDone ? (
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ marginRight: "5px" }}
                onClick={() => toggleNote(id)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircle}
                style={{ marginRight: "5px" }}
                onClick={() => toggleNote(id)}
              />
            )}
            {isEditing ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="input-edit"
              />
            ) : (
              <span onClick={() => toggleNote(id)}>{note.text}</span>
            )}
          </div>
          <div className="right-section">
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ marginRight: "5px", marginLeft: "5px" }}
              onClick={() => deleteNote(id)}
            />
            <FontAwesomeIcon
              icon={faEdit}
              style={{ marginLeft: "5px" }}
              onClick={handleEdit}
            />
            {isEditing && (
              <FontAwesomeIcon
                icon={faFloppyDisk}
                style={{ marginLeft: "5px" }}
                onClick={handleSave}
              />
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};
