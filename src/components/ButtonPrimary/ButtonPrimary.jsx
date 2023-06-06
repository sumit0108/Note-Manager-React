import React from "react";
import s from "./style.module.css";

export const ButtonPrimary = ({
  className,
  type,
  children,
  onClick,
  isDisable,
}) => {
  return (
    <button
      disabled={isDisable}
      onClick={onClick}
      type={type}
      className={`btn btn-primary ${s.container} ${className}`}
    >
      {children}
    </button>
  );
};
