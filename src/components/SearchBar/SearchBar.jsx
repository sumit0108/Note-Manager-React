import React from "react";
import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";
import { Input } from "components/Input/Input";

export const SearchBar = ({ onTextChange, placeholder }) => {
  return (
    <div>
      <SearchIcon size={25} className={s.icon} />
      <Input onTextChange={onTextChange} placeholder={placeholder} />
    </div>
  );
};
