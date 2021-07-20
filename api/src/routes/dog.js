const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Dog } = require("../db.js")
require("dotenv").config();
const { Sequelize, UUID } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

router.post("/", async (req, res, next) => {
    const{name,
        height,
        weight,
        life_span,
        temperaments}= req.body; 
        
    console.log(temperaments)
    try {
        let id = uuidv4()
        createNewDog = await Dog.create({name, height, weight, life_span, id})
        await createNewDog.setTemperaments(temperaments)
    } catch (error) {
        next(error)
    }
})

module.exports = router;