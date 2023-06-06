import { NoteApi } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateNote } from "store/notes/notes-slice";
import { deleteNote } from "store/notes/notes-slice";

export const Note = (props) => {
  const { noteId } = useParams();
  const note = useSelector((store) =>
    store.noteSlice.noteList.find((note) => note.id === noteId)
  );
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (formValues) => {
    const updatedNote = await NoteApi.updateById(note.id, formValues);
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
    console.log(updatedNote);
  };

  async function deleteNote_() {
    if (window.confirm("Delete Note ?")) {
      NoteApi.deleteById(note.id);
      dispatch(deleteNote(note));
      navigate("/");
    }
  }
  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          title={isEditable ? "Edit Note" : note.title}
          note={note}
          onClickEdit={() => setIsEditable(!isEditable)}
          onClickDelete={deleteNote_}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
};
