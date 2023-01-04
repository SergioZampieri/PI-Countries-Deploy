import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";

export default function LandingPage() {
  return (
    <div className={style.maindiv}>
      <h1 className={style.text}>Are you ready to travel around the world?</h1>
      <Link to="/home">
        <button className={style.button}>Lets go!</button>
        <div className={style.image}></div>
      </Link>
    </div>
  );
}
