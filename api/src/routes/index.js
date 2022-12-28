const { Router } = require("express");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videogamesRouter = require("./videogames.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesRouter);

module.exports = router;
