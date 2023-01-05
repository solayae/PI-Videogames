const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");
const router = Router();

// traemos la información de la api
const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`,
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    }
  );
  const apiInfo = await apiUrl.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      released: el.released,
      rating: el.rating,
      platforms: el.platforms.slice(0, 3),
    };
  });
  console.table(apiInfo);
  return apiInfo;
};

// traemos la info de la bd
const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//concatenamos la info de la api con la info de la db
getAllGames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = await apiInfo.concat(dbInfo);
  return infoTotal;
};



router.get("/", async (req, res) => {
  const { name } = req.query;
  const gamesTotal = await getAllGames();
  if (name) {
    let gameName = await gamesTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLocaleLowerCase())
    );
    gameName.length
      ? res.status(200).send(gameName)
      : res.status(404).send("sorry, no esta el personaje");
  } else {
    res.status(200).send(gamesTotal);
  }
});


router.get("/games", (req, res) => {
  res.status(200).send(getApiInfo())
})

module.exports = router;

// config adicional para que axios funcione
 