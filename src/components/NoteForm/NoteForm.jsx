import React, { useState } from "react";
import s from "./style.module.css";
import { PenFill, TrashFill } from "react-bootstrap-icons";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { validatorService } from "utils/validator";
import { FieldError } from "components/FieldError/FieldError";

const VALIDATOR = {
  title: (value) => {
    return validatorService.min(value, 3) || validatorService.max(value, 20);
  },

  content: (value) => {
    return validatorService.min(value, 3);
  },
};
export const NoteForm = ({
  isEditable = true,
  note,
  title,
  onClickEdit,
  onClickDelete,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState({
    title: note?.title || "",
    content: note?.content || "",
  });
  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : true,
    content: note?.content ? undefined : true,
  });
  const updateFormValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({ ...formValues, [name]: value }); // If i remove ... this then we have only one value at the time
    validate(name, value);
  };

  const validate = (fieldName, fieldValue) => {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATOR[fieldName](fieldValue),
    });
  };

  const hasError = () => {
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        return true;
      }
    }
    return false;
  };
  const actionIcons = (
    <>
      <div className="col-1">
        {onClickEdit && <PenFill onClick={onClickEdit} className={s.icon} />}
      </div>
      <div className="col-1">
        {onClickDelete && (
          <TrashFill onClick={onClickDelete} className={s.icon} />
        )}
      </div>
    </>
  );
  const titleInput = (
    <div className="mb-5">
      <label className="form-lable">Title</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="title"
        className="form-control"
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );
  const contentInput = (
    <div className="mb-5">
      <label className="form-lable">Content</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="content"
        className="form-control"
        row="5"
        value={formValues.content}
      />
      <FieldError msg={formErrors.content} />
    </div>
  );
  const submitBtn = (
    <div className={s.submit_btn}>
      <ButtonPrimary
        isDisable={hasError()}
        onClick={() => onSubmit(formValues)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );
  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={`mb-3 ${s.title_input_container}`}>
        {isEditable && titleInput}
      </div>
      <div className="mb-3">
        {isEditable ? contentInput : <pre>{note.content}</pre>}
      </div>
      {onSubmit && submitBtn}
    </div>
  );
};
