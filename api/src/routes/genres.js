const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

const router = Router();

router.get("/", async (req, res) => {
  const genresApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`,
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    }
  );
  const genresGames = await genresApi.data.results;
  console.log(genresGames);
  genresGames.forEach((el) => {
    Genre.findOrCreate({
      where: { name: el.name },
      defaults: {
        name: el.name,
        id: el.id,
      },
    });
  });
	let genresDB = await Genre.findAll();
	res.status(200).send(genresDB);
});

module.exports = router;
