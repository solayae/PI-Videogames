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
      image: el.background_image,
      genres: el.genres.map((el) => el.name),
      platforms: el.platforms.slice(0, 3).map((el) => el.platform.name),
    };
  });
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
  console.log("hola, esta es la funcion")
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
      : res.status(404).send("sorry, no esta el juego");
  } else {
    res.status(200).send(gamesTotal);
  }
});

// const postVideogame = async (body) => {
//   const createVideogame = await Videogame.create({ ...body });
//   if (createVideogame) await createVideogame.addGenre(body.genre);
//   return "Videogame created succesfully";
// };

router.post("/", async (req, res) => {
  const postVideogame = async (body) => {
    if (!body.name || !body.description || !body.platforms) {
      res
        .status(404)
        .send(
          "Faltan campos obligatorios como nombre, descripción o plataformas"
        );
    } else {
      const createVideogame = await Videogame.create({ ...body });
      if (createVideogame) await createVideogame.addGenre(body.genre);
      return "Videogame created succesfully";
    }
  };
  const body = req.body;
  try {
    const gameCreated = await postVideogame(body);
    res.send(gameCreated);
  } catch (error) {
    res.status(404).send(error.message);
  }
});




module.exports = router;

// config adicional para que axios funcione
