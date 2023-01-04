import React from "react";
import { Link } from "react-router-dom";
import style from "./Error404.module.css";

export default function Error404() {
  return (
    <div className={style.maindiv}>
        <div className={style.filter}>
        <h1>Error 404</h1>
        <h2>Path is non existent</h2>
        </div>
        <div className={style.image}></div>
        <Link to="/home">
          <button className={style.button}>
            Take me back to the main page
          </button>
        </Link>
    </div>
  );
}
