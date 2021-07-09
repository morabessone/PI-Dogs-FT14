const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Dog, Temperament } = require("../db.js")
require("dotenv").config();
const { API_KEY, API } = process.env;
const { Sequelize } = require("sequelize");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

router.get("/", async (req, res, next) => {
    try {
        var allTemps = [];
        var finalTemps = [];
        var dbTemps = [];
            await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            .then(resp => allTemps = resp.data)
            let temper = allTemps.map(y => y.temperament);
            let splitting = temper.map(e => e && e.split(","))
            let concat = splitting.flat()
            concat.map(e => {
                if (e != undefined) {
                    if (finalTemps.length === 0 || !finalTemps.includes(e.trim())) {
                        let sinEsp = e.trim()
                        finalTemps.push(sinEsp)
                    }
                }
            })
            finalTemps.sort()
            for (let i = 0 ; i < finalTemps.length-1 ; i++) {
                let id = uuidv4();
                Temperament.create({id: id, name: finalTemps[i]})
            }
    } catch (error) {
        next(error)
    } 
})


module.exports = router;