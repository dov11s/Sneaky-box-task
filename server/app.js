require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const citiesRouter = require("./api/cities/cities.router");

app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`Server is runing on port ${process.env.PORT}`);
});

app.use("/api/cities", citiesRouter);

app.get("/", (req, res) => {
  res.send("labas veikia");
});
