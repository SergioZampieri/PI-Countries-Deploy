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
