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
const data = require("./data/weather.json");

// this settting says that everyone is allowed to speak to our server
app.use(cors());

// we are getting the port variable from the .env file.
const PORT = process.env.PORT;

const error = {
  error: "Something went wrong.",
};
// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get("/", (request, response) => {
  response.send(error);
  response.status(500);
});

app.get("/weather", (request, response) => {
  if (request.query.lat && request.query.lon && request.query.searchQuery) {
    let latSearch = request.query.lat.split(".")[0];
    let lonSearch = request.query.lon.split(".")[0];
    let citySearch = request.query.searchQuery;

    let dataCitySearch = data.find((city) => city.city_name.toLowerCase() === citySearch.toLowerCase());

    dataCitySearch.lon = dataCitySearch.lon.toString().split(".")[0];
    dataCitySearch.lat = dataCitySearch.lat.toString().split(".")[0];

    if (dataCitySearch.lon == lonSearch && dataCitySearch.lat == latSearch) {
      let forecast = dataCitySearch.data.map((data) => {
        let forecastTemp = {
          date: data.datetime,
          description: data.weather.description,
        };
        return forecastTemp;
      });
      response.send(forecast);
    } else {
      response.send("No data for your search. Make sure to enter the correct lat, lon, city name");
      response.status(500);
    }
  } else {
    response.send(error);
    response.status(500);
  }
});

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
