const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeDogs = require("./dogs")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", routeDogs);

module.exports = router;
