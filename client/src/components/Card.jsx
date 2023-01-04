import React from "react";
import style from "./Card.module.css";
export default function Card ({name, flag, region}){
    return(
        <div className={style.card}>
            <h3 className={style.title} >{name}</h3>
            <h5 className={style.region}>{region}</h5>
            <img className={style.flag} src={flag} alt="img not found" />
        </div>
    )
}