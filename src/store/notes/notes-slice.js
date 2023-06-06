import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "noteSlice",
  initialState: {
    noteList: [],
  },
  reducers: {
    setNoteList: (state, action) => {
      state.noteList = action.payload;
    },
    addNote: (state, action) => {
      state.noteList.push(action.payload);
    },
    updateNote: (state, action) => {
      const indexToUpdate = state.noteList.findIndex(
        (note) => note.id === action.payload.id
      );
      state.noteList[indexToUpdate] = action.payload;
    },
    deleteNote: (state, action) => {
      const filteredNote = state.noteList.filter(
        (note) => note.id !== action.payload.id
      );
      state.noteList = filteredNote;
    },
  },
});

export const noteReducer = noteSlice.reducer;
export const { setNoteList, addNote, updateNote, deleteNote } =
  noteSlice.actions;
