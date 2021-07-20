/* const { Router } = require('express');
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
                Temperament.create({name: finalTemps[i]})
            }
            const database = await Temperament.findAll();
            res.json(database);
    } catch (error) {
        next(error)
    } 
})
 */

require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { API_KEY, API } = process.env;
const { Temperament } = require("../db.js")
const axios = require('axios');

router.get("/", async (req, res, next) => {
    try{
        const db = await Temperament.findAll()
        return res.json(db).status(200)
    } catch (e) {
        return res.json(e.message).status(409)
    }
})


module.exports = router;
