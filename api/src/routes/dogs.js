const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { Dog, Temperament } = require("../db.js")
require("dotenv").config();
const { API_KEY, API } = process.env;
const { Sequelize, Op } = require("sequelize");
const axios = require("axios");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res, next) => {
    const {name} = req.query
    if (!name) {
        try {
            let myDogs = await Dog.findAll()
            let api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
            Promise.all([myDogs, api]).then((results) => {
                const [resMyDogs, resApi] =  results;
                const response = resMyDogs.concat(resApi.data);
                res.send(response);
            })
        } catch (error) {
            next(error);
            } 
        } else {
            try {
                let myDogs = await Dog.findAll({
                where: {
                name: { [Op.iLike]: `%${name}%` },
                }
                });
                let api = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`);
                Promise.all([myDogs, api]).then((results) => {
                    const [resMyDogs, resApi] = results;
                    const response = resMyDogs.concat(resApi.data);
                    res.send(response);
                })
                }
                catch(error) {
                    next(error)
                };
    }
})
router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    if (id.length) {
        try {
            await axios.get(`${API}/${id}&api_key=${API_KEY}`)
             .then((results) => res.send(results.data))
        } catch (error) {
            next(error)
        }
    } else {
        try {
            Dog.findAll({ 
                where: {id: id},
                include: {
                    model: Temperament,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            })
            .then(resp => res.send(resp))
        
        } catch (error) {
            next(error)
        }
    }
})

module.exports = router;