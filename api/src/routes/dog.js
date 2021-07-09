const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Dog } = require("../db.js")
require("dotenv").config();
const { Sequelize, UUID } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

router.post("/", async (req, res, next) => {
    const dog = req.body;
    if (!dog) {
        res.status(400).json({msg: "Must complete the fields to create a new Dog"})
    } 
    try {
        let id = uuidv4()
        let newDog = {
            ...dog,
            id
        }
        const yourNewDog = await Dog.create(newDog);
        return res.send(yourNewDog)
    } catch (error) {
        next(error)
    }
})

module.exports = router;