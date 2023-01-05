import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCountryByActivity,
  filterCountryByRegion,
  getCountries,
  filterCountryByOrd,
  filterCountryByPop,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import style from "./Home.module.css";
import Loading from "./Loading";

export default function Home() {
  const dispatch = useDispatch(); //utilizo la constante para despachar acciones
  const allCountries = useSelector((state) => state.countries); //es lo mismo que hacer mapStateToProps. Con useSelector trae en esa const todo lo que esta en el estado de countries
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountry = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries()); //hace lo mismo que el mapdispatchtoprops
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }
  function handleFilteredRegion(e) {
    e.preventDefault();
    dispatch(filterCountryByRegion(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleFilteredActivity(e) {
    e.preventDefault();
    dispatch(filterCountryByActivity(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleFilteredOrder(e) {
    e.preventDefault();
    dispatch(filterCountryByOrd(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleFilteredPopulation(e) {
    e.preventDefault();
    dispatch(filterCountryByPop(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  return (
    <div className={style.maindiv}>
      <button>
        <Link to="/activities">Create your Activity</Link>
      </button>
   
      <div>

        <div className={style.filter}>
       
          <select
            className={style.select}
            onChange={(e) => handleFilteredOrder(e)}
          >
            <option value="asc">A-Z</option>
            <option value="dec">Z-A</option>
          </select>
          <select
            className={style.select}
            onChange={(e) => handleFilteredPopulation(e)}
          >
            <option value="min">Min Population</option>
            <option value="max">Max Population</option>
          </select>
          <select
            className={style.select}
            onChange={(e) => handleFilteredRegion(e)}
          >
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
            <option value="Asia">Asia</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Europe">Europe</option>
          </select>
          <select
            className={style.select}
            onChange={(e) => handleFilteredActivity(e)}
          >
            <option value="all">All activities</option>
            <option value="winter">Winter activities</option>
            <option value="fall">Fall activities</option>
            <option value="summer">Summer activities</option>
            <option value="spring">Spring activities</option>
          </select>
          <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reset all filters
      </button>
        </div>
        <SearchBar />
        <div className={style.CardContainer}>
          <div className={style.Card}>
            {
            
            allCountries && allCountries.length !== 0 ? (currentCountry?.map((c) => {
              return (
                <Link to={`/countries/${c.id}`}>
                  <Card
                    flag={c.flag}
                    name={c.name}
                    region={c.continent}
                    key={c.id}
                  />
                </Link>
              );
            })) : <Loading/>}
            
            
          </div>
        </div>

        
      </div>
      <div className={style.pagination}>
        <Pagination
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          pagination={pagination}
          currentPage= {currentPage}
         setCountriesPerPage ={setCountriesPerPage}
        />
      </div>
    </div>
  );
}
