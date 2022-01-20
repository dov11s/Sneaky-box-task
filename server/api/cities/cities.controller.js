const {
  creatCity,
  getCitysByID,
  getCities,
  deleteCity,
} = require("./cities.service.js");

const axios = require("axios");

let baseUrl = "https://api.meteo.lt/v1/places/";
let endUrl = "/forecasts/long-term";

module.exports = {
  creatCity: (req, res) => {
    const body = req.body;

    if (body.description.length > 255)
      return res.status(400).json({ error: "description is to long" });

    creatCity(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.code });
      }

      //body.c = results.insertId;
      return res.status(201).json(body);
    });
  },
  getCitysByID: (req, res) => {
    const id = req.params.id;
    getCitysByID(id, async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      if (!results) {
        return res.status(404).send();
      }

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow = tomorrow.getDate();

      let locationData = await axios.get(baseUrl + results.code + endUrl);
      locationData = locationData.data.forecastTimestamps;

      var filteredData = locationData
        .filter((a) => {
          var date = new Date(a.forecastTimeUtc);
          let day = date.getDate();
          return day == tomorrow;
        })
        .sort(function (a, b) {
          return (
            parseFloat(b["airTemperature"]) - parseFloat(a["airTemperature"])
          );
        });

      results.minTemp = filteredData[filteredData.length - 1]["airTemperature"];
      results.maxTemp = filteredData[0]["airTemperature"];

      return res.status(200).json(results);
    });
  },
  getCities: (req, res) => {
    getCities(async (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow = tomorrow.getDate();

      await Promise.all(
        results.map(async (obj) => {
          let locationData = await axios.get(baseUrl + obj.code + endUrl);
          locationData = locationData.data.forecastTimestamps;

          var filteredData = locationData
            .filter((a) => {
              var date = new Date(a.forecastTimeUtc);
              let day = date.getDate();
              return day == tomorrow;
            })
            .sort(function (a, b) {
              return (
                parseFloat(b["airTemperature"]) -
                parseFloat(a["airTemperature"])
              );
            });

          obj.minTemp = filteredData[filteredData.length - 1]["airTemperature"];
          obj.maxTemp = filteredData[0]["airTemperature"];
        })
      );

      return res.json(results);
    });
  },
  deleteCity: (req, res) => {
    const id = req.params.id;
    deleteCity(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results || results.affectedRows === 0) {
        return res.status(404).send();
      }

      return res.status(200).send();
    });
  },
};
