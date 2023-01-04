const initialState = {
  countries: [],
  allCountries: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case "GET_COUNTRY_NAME":
      return {
        ...state,
        countries: action.payload,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    case "FILTER_BY_REGION":
      const allCountries = state.allCountries;
      const regionFiltered =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((e) => e.continent === action.payload);
      return {
        ...state,
        countries: regionFiltered,
      };

    case "FILTER_ORD":
      const ordcountries = state.countries;
      if (action.payload === "asc") {
        ordcountries.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "dec") {
        ordcountries.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        countries: ordcountries,
      };

    case "FILTER_POP":
      let populationCountry =
        action.payload === "min"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
          return {...state, countries: populationCountry}

    case "FILTER_BY_ACTIVITY":
      const allActivities = state.allCountries;
      const activityFiltered =
        action.payload === "all"
          ? allActivities.filter((c) => c.activities.length > 0)
          :allActivities.filter((c) => c.activities.map((ac) => ac.season).includes(action.payload));
      return {
        ...state,
        countries: activityFiltered,
      };

    case "POST_COUNTRY":
      return {
        ...state,
      };

    default:
      return state;

      
  }
}

export default rootReducer;
