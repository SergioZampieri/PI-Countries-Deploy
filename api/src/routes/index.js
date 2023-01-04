const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const axios = require("axios");
const { Activity, Country } = require("../db");
const countries = require("../Controllers/countries");
const activities = require("../Controllers/activities");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);





router.use("/countries", countries);
router.use("/activities", activities);

module.exports = router;
/*

[ ] GET /countries:
En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
Obtener un listado de los paises.
[ ] GET /countries/{idPais}:
Obtener el detalle de un país en particular
Debe traer solo los datos pedidos en la ruta de detalle de país
Incluir los datos de las actividades turísticas correspondientes
[ ] GET /countries?name="...":
Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
Si no existe ningún país mostrar un mensaje adecuado
[ ] POST /activities:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
Crea una actividad turística en la base de datos, relacionada con los países correspondientes
*/

/*
const axios = require("axios");
const {Country} = require("../db")

//Function that changes original object to PI needs
const changeObject = (obj) => {
    let newArr = [];

    for (i = 0; i < obj.length; i++) {
        let newObj = { id: "" };
        for (props in obj[i]) {

            if (props === "fifa" && "fifa" !== "") {
                newObj.id = obj[i].fifa;
            } else if (props === "cca3" && "cca3" !== "") {
                newObj.id = obj[i].cca3;
            }
            if (props === "name") newObj.name = obj[i].name.common;
            if (props === "capital") newObj.capital = obj[i].capital[0];
            if (props === "continents") newObj.continent = obj[i].continents[0];
            if (props === "subregion") newObj.subregion = obj[i].subregion;
            if (props === "area") newObj.area = obj[i].area;
            if (props === "population") newObj.population = obj[i].population;
            if (props === "flags") newObj.flag = obj[i].flags[0];
            if (!newObj.capital) newObj.capital = "No data";
            if (!newObj.subregion) newObj.subregion = "No data";
        }
        newArr.push(newObj);
    }
    return newArr;
};


const loadDataBase = async ()=>{

    const info = await axios.get("https://restcountries.com/v3/all%22)
    const bulk = changeObject(info.data)
    Country.bulkCreate(bulk);
}

module.exports ={
    loadDataBase
}




*/
