import React from 'react'
import style from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={style.maindiv}>
        <div className={style.image}></div>
        <h1>Loading...</h1>
    </div>
  )
}
