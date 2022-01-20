const {
  creatCity,
  getCitysByID,
  getCities,
  deleteCity,
} = require("./cities.controller.js");

const router = require("express").Router();

router.post("/", creatCity);
router.get("/", getCities);
router.get("/:id", getCitysByID);
router.delete("/:id", deleteCity);

module.exports = router;
