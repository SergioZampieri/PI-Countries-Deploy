const axios = require("axios");
const { Activity, Country } = require("../db");
require('dotenv')

const loadDB = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all");
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      name: e.name.common,
      id: e.cca3,
      flag: e.flags[0],
      continent: e.continents[0],
      capital: e.capital ? e.capital[0] : "no capital",
      subregion: e.subregion ? e.subregion : "no region",
      area: e.area,
      population: e.population,
    };
  });
  return Country.bulkCreate(apiInfo);
};

module.exports = { loadDB };
