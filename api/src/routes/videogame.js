const { Router } = require("express");
const router = Router();
const getAllGames = require("./videogames");

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const videogamesTotal = await getAllGames();
  try {
    if (id) {
      let videogameId = await videogamesTotal.filter((el) => {
        el.id == id;
      });
      videogameId
        ? res.status(200).send(videogameId)
        : res.status(404).send("NO se encontró el videojuego");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// router.get("/", async (req, res) => {
//   res.send("hola")
// })

module.exports = router;
