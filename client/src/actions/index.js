import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    var json = await axios.get("/countries");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}

export function GetNameCountry(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "/countries?name=" + name
      );
      return dispatch({
        type: "GET_COUNTRY_NAME",
        payload: json.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}


export function getDetail(id){
  return async function (dispatch){
    try {
      var json = await axios.get("/countries/" + id)
      return dispatch ({
        type: "GET_DETAILS",
        payload: json.data  
      })
    } catch (error) {
       console.log(error)
    }
  }
}


export function filterCountryByRegion(payload) {
  return {
    type: "FILTER_BY_REGION",
    payload,
  };
}
export function filterCountryByActivity(payload) {
  console.log('actionpayload', payload)
  return {
    type: "FILTER_BY_ACTIVITY",
    payload,
  };
}


export function filterCountryByOrd(payload) {  
  return {
    type: "FILTER_ORD",
    payload,
  };
}


export function filterCountryByPop(payload) {
  return {
    type: "FILTER_POP",
    payload,
  };
}


export function postActivity(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "/activities",
      payload
    );
    return response;
  };
}
