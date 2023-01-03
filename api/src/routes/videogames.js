const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.get("/", (req, res) => {
  axios
    .get("https://api.rawg.io/api/games?key=9f98323b4f174115a004ac5d4daf0fb3", { 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  })
    .then((response) => {
      res.send(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
