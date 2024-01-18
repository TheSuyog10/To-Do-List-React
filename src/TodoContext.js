// TodoContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      updateLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  const toggleNote = (id) => {
    setNotes((prevValue) => {
      const updatedNotes = prevValue.map((data) =>
        data.id === id ? { ...data, isDone: !data.isDone } : data
      );
      updateLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  const deleteNote = (id) => {
    setNotes((prevValue) => {
      const updatedNotes = prevValue.filter((data) => data.id !== id);
      updateLocalStorage(updatedNotes);
      return updatedNotes;
    });
  };

  const updateNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    updateLocalStorage(updatedNotes);
  };

  const updateLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  return (
    <TodoContext.Provider
      value={{ notes, addNote, toggleNote, deleteNote, updateNotes }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }

  const { notes, addNote, toggleNote, deleteNote, updateNotes } = context;

  return { notes, addNote, toggleNote, deleteNote, updateNotes };
};
