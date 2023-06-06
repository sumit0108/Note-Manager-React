import { NoteApi } from "api/note-api";
import { NoteForm } from "components/NoteForm/NoteForm";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "store/notes/notes-slice";

export const NoteCreate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (formValues) => {
    const createdNote = await NoteApi.create({
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    });
    dispatch(addNote(createdNote));
    alert("The Note has been created");
    navigate("/");
  };
  return (
    <>
      <NoteForm title="New Note" onSubmit={submit} />
    </>
  );
};
