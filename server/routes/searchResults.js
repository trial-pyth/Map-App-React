const express = require("express");
const router = express.Router();
const axios = require("axios");
const url = require("url");

router.get("/:query", async (req, res) => {
  try {
    //add api key & query strings
    const params = new URLSearchParams({
      access_token: process.env.API_KEY,
      ...url.parse(req.url, true).query,
    });
    console.log(params);
    const query = req.params.query;
    const results = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );

    results.data.features.forEach((item) => {
      //set to null
      item.city = null;
      item.state = null;

      //loop through content results
      item.context.forEach((type) => {
        if (type.id.includes("place")) {
          item.city = type.text;
        }
        if (type.id.icludes("regios")) {
          item.state = type.text;
        }
      });
    });

    const data = results.data;
    res.status(200).json(data);
    // console.log(req.params.query);
  } catch (err) {
    res.status(500).json({ error: err.msg });
  }
});

module.exports = router;
