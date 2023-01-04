import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../actions";
import style from "./Detail.module.css";
import Loading from "./Loading";


export default function Detail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id
  useEffect(()=>{
    dispatch(getDetail(id))
},[dispatch,id]);
  const country = useSelector((state) => state.detail);


  return (
    <div>
      <Link to="/home">
        <button>Back to all countries</button>
      </Link>
      {country.length > 0 ? (
        <div className={style.maindiv}>
          <img
            className={style.flag}
            src={country[0].flag}
            alt="img not found"
          />
          <h1 className={style.button}>Name: {country[0].name}</h1>
          <h3 className={style.button}>Continent: {country[0].continent}</h3>
          <h3 className={style.button}>Subregion: {country[0].subregion}</h3>
          <h3 className={style.button}>Capital: {country[0].capital}</h3>
          <h3 className={style.button}>Area: {country[0].area}</h3>
          <h3 className={style.button}>Population: {country[0].population}</h3>
          <h3 className={style.button}>Activities: </h3>

          {country[0].activities && country[0].activities?.length > 0 ? (
            country[0].activities?.map((e) => {
              return (
                <div className={style.activities} key={e.id}>
                  <p>Name: {e.name}</p>
                  <p>Difficulty: {e.difficulty}</p>
                  <p>Duration: {e.duration}</p>
                  <p>Season: {e.season}</p>
                  <hr></hr>
                </div>
              );
            })
          ) : (
            <p>Without activities</p>
          )}
        </div>
      ) : (
        <Loading/>
      )}
    </div>
  );
}
