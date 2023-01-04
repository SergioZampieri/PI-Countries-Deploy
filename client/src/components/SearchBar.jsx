import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { GetNameCountry } from "../actions";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(GetNameCountry(name));
  }

  return (
    <div className={style.navbar}>
      <input
        className={style.contSearch}
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Search Country..."
      />
      <button className={style.botact} onClick={(e) => handleSubmit(e)} type="submit">
        Search
      </button>
    </div>
  );
}