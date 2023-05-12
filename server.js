"use strict";

// this library lets us access our .env file
require("dotenv").config();

// express is a server library
const express = require("express");

// initalizes the express library
const app = express();

// library that determines who is allowed to speak to our server
const cors = require("cors");

// Importing a json file
//const data = require("./data/weather.json");

// this settting says that everyone is allowed to speak to our server
app.use(cors());

// we are getting the port variable from the .env file.
const PORT = process.env.PORT;
const axios = require("axios");

const error = {
  error: "Something went wrong.",
};
const movie = require("./library/movie");
const weather = require("./library/weather");

// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get("/", (request, response) => {
  response.status(200).json("base of the api please read the doc");
});
app.get("/weather", weather);
app.get("/movies", movie);

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
