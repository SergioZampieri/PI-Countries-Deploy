import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getActivities, postActivity } from "../actions";
import style from "./ActivityCreate.module.css";

const regex = /([A-Z])\w+/
function validate(input) {
  let errors = {};
  if (!input.name || !regex.test(input.name)) {
    errors.name = "A VALID CAPITALIZED NAME IS REQUIRED";
  } else if (input.duration < 1 || input.duration > 24) {
    errors.duration = "A DURATION BETWEEN 1HS AND 24HS IS REQUIRED";
  } else if (input.season === "") {
    errors.season = "A SEASON IS REQUIRED";
  } else if (!input.difficulty) {
    errors.difficulty = "A DIFFICULTY IS REQUIRED";
  } else if (input.countryIDs.length === 0) {
    errors.countryIDs = "A COUNTRY IS REQUIRED";
  }
  return errors;
}





// function validate(input) {
//   let errors = {};
//   switch(errors) {
//    case (!input.name): errors.name = "A name is required";
//    case (input.duration < 1 || input.duration >24 ): errors.duration = "A duration is required";
//    case (!input.season) :  errors.season = "A season is required";
//    case (!input.difficulty):  errors.difficulty = "A difficulty is required"
//    case (input.countries.length === 0):  errors.countries = "A country is required"
//    default: return errors
//   }
//  }

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allcountries = useSelector((state) => state.allCountries);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    duration: 0,
    season: "",
    difficulty: "",
    countryIDs: [],
  });

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log(input);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSeason(e) {
    setInput({ ...input, season: e.target.value });
    console.log(input);
    setErrors(
      validate({
        ...input,
        season: e.target.value,
      })
    );
  }

  function handleRange(e) {
    setInput({ ...input, difficulty: e.target.value }); //aunque es igual a handlechange, cuando implemento handle change no lo cambia
    console.log(input);
    console.log(errors);
    setErrors(
      validate({
        ...input,
        difficulty: e.target.value,
      })
    );
  }

  const handleCountry = (e) => {
    setInput({
      ...input,
      countryIDs: [...new Set([...input.countryIDs, e.target.value])],
    });
    setErrors(
      validate({
        ...input,
        countryIDs: [...input.countryIDs, e.target.value],
      })
    );
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      countryIDs: input.countryIDs.filter((c) => c !== e.target.value),
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(input));
    alert("Activity Created");
    setInput({
      name: "",
      duration: 0,
      season: "",
      difficulty: "",
      countries: [""],
    });
    history.push("/home");
  }

  const season = ["summer", "fall", "winter", "spring"];

  return (
    <div className={style.maindiv} >
      <div>
        <Link to="/home">
          <button>Back to countries</button>
        </Link>
      </div>
      <h1>Create your activity!</h1>
      <form  onSubmit={handleSubmit}>
        <div className={style.secondarydiv}>
          <label className={style.button}>Name:</label>
          <input
            className={style.button}
            onChange={(e) => handleChange(e)}
            type="text"
            value={input.name}
            name="name"
          />
        </div>

        <div className={style.secondarydiv}>
          <label className={style.button}>Duration:</label>
          <input
            className={style.button}
            onChange={(e) => handleChange(e)}
            type="number"
            value={input.duration}
            name="duration"
            min="1"
            max="24"
          />
          <label className={style.button}>Hs</label>
          
        </div>

        <div className={style.secondarydiv}>
          <label className={style.button}>Difficulty:</label>
          <input
            className={style.button}
            onChange={handleRange} //le paso una nueva fucion y no handlechange porque sino se rompe
            type="range"
            min="1"
            max="5"
            value={input.difficulty}
          />
          
        </div>

        <div className={style.secondarydiv}>
          <label className={style.button}>Season:</label>
          <select className={style.button} onChange={handleSeason}>
            {season.map((e) => (
              <option value={e} name="season" key={e}>
                {e}
              </option>
            ))}
          </select>
          
        </div>

        <div className={style.secondarydiv}>
          <label className={style.button}>Countries: </label>
          <select className={style.button} name="countries" onChange={handleCountry}>
            <option hidden selected>
              Select one or more countries
            </option>
            {allcountries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          
        </div>
        <div className={style.selections}>
        {input.countryIDs.map((c) => (
            <div key={c}>
              {c}
              <button value={c} onClick={handleDelete}>
                X
              </button>
            </div>
          ))}
          </div>
        <button className={style.btn}
          disabled={Object.keys(errors).length !== 0 ? true : false}
          type="submit"
        >
          Create Activity
        </button>
      </form>
      {errors.name && <p className={style.error}>{errors.name}</p>}
      {errors.duration && <p className={style.error}>{errors.duration}</p>}
      {errors.difficulty && <p className={style.error}>{errors.difficulty}</p>}
      {errors.season && <p className={style.error}>{errors.season}</p>}
      {errors.countryIDs && <p className={style.error}>{errors.countryIDs}</p>}
    </div>
  );
}
