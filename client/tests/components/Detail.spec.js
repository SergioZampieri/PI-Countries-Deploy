import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import * as ReactRedux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";



import Detail from "../components/Detail";
import * as data from "../db.json";
import * as actions from "../../src/actions/index";
import axios from "axios";
import nock from "nock";
import nodeFetch from "node-fetch";
axios.defaults.adapter = require("axios/lib/adapters/http");

configure({ adapter: new Adapter() });

jest.mock('../../src/actions/index', () => ({
  getMovieDetail: () => ({
    type: 'GET_DETAILS'
  })
}));

describe("<Detail />", () => {
  global.fetch = nodeFetch;
  let Detail, useSelectorStub, useSelectorFn, useEffect;
  const noProd = {
    id:"ARG",
    name:"Argentina",
    flag:"https://flagcdn.com/ar.svg",
    continent:"South America",
    capital:"Buenos Aires",
    subregion:"South America",
    area:2780400,
    population:45376763,
    activities:[] 
  };

  const match = (id) => ({
    params: { id },
    isExact: true,
    path: "/countries/:id",
    url: `/countries/${id}`,
  });
  const mockStore = configureStore([thunk]);

  beforeAll(() => expect(isReact.classComponent(Detail)).toBeFalsy());
  const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

  beforeEach(() => {
    const apiMock = nock("http://localhost:3001").persist();
    apiMock.get("/countries").reply(200, data.countries);

    let id = null;
    apiMock
      .get((uri) => {
        id = Number(uri.split("/").pop()); // Number('undefined') => NaN
        return !!id;
      })
      .reply(200, (uri, requestBody) => {
        return data.countries.find((country) => country.id === id) || {};
      });
    useSelectorStub = jest.spyOn(ReactRedux, "useSelector");
    useSelectorFn = (id) =>
      useSelectorStub.mockReturnValue(store(id).getState().Detail);
    useEffect = jest.spyOn(React, "useEffect");
    movieDetail = (id) =>
      mount(
        <ReactRedux.Provider store={store(id)}>
          <MemoryRouter initialEntries={[`/countries/${id}`]}>
            <Detail match={match(id)} />
          </MemoryRouter>
        </ReactRedux.Provider>
      );
    mockUseEffect();
    mockUseEffect();
  });

  afterEach(() => jest.restoreAllMocks());

    // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
    // import * as actions from "./../../redux/actions/index";


  it("Debería usar un useEffect y dentro de este, dispachar la acción getDetail, pasandole como argumento el ID de el country a renderizar", async () => {
    // Nuevamente testeamos todo el proceso. Tenes que usar un useEffect, y despachar la acción "getMovieDetail".
    const useDispatch = jest.spyOn(ReactRedux, "useDispatch");
    const getDetail = jest.spyOn(actions, "getDetail");
    movieDetail(1);
    expect(useEffect).toHaveBeenCalled();
    expect(useDispatch).toHaveBeenCalled();
    expect(getDetail).toHaveBeenCalled();

    movieDetail(2);
    expect(useEffect).toHaveBeenCalled();
    expect(useDispatch).toHaveBeenCalled();
    expect(getDetail).toHaveBeenCalled();
  });

  describe('Debería recibir por props el objeto "match". Utilizar el "id" de "params" para despachar la action "getDetail" y renderizar los detalles del pais', () => {
    const country = data.country[0];

    // Fijate que para traerte los datos desde Redux, vas a tener que usar el hook de Redux "useSelector"
    // para que los tests pasen!
    // Lo que se esta testeando aca, es que el componente renderice los detalles del todo correctamente,
    // no la estructura del componente asi que eres libre de diseñar la estructura, siempre y cuando se muestren los datos del todo.
    // Verificar la llegada de datos en el objeto "match.params", puede romper en el caso que no exista nada.
    it("Deberia renderizar el name del pais.", () => {
      useSelectorFn(1);
      expect(Detail(1).text().includes(country.name)).toEqual(true);
      expect(useSelectorStub).toHaveBeenCalled();
      expect(useEffect).toHaveBeenCalled();
    });
    it("Deberia rederizar la flag.", () => {
      useSelectorFn(1);
      expect(Detail(1).text().includes(country.flag)).toEqual(true);
      expect(useSelectorStub).toHaveBeenCalled();
      expect(useEffect).toHaveBeenCalled();
    });
    it("Deberia renderizar el continent.", () => {
      useSelectorFn(1);
      expect(Detail(1).text().includes(country.continent)).toEqual(true);
      expect(useSelectorStub).toHaveBeenCalled();
      expect(useEffect).toHaveBeenCalled();
    });
    it("Deberia renderizar la capital.", () => {
      useSelectorFn(1);
      expect(Detail(1).text().includes(country.capital)).toEqual(true);
      expect(useSelectorStub).toHaveBeenCalled();
      expect(useEffect).toHaveBeenCalled();
    });
  });
});