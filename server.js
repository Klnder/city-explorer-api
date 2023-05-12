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
// this is a route. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'
app.get("/", (request, response) => {
  response.status(500).json(error);
});

//base https://api.weatherbit.io/v2.0/forecast/daily
//key
//city
//${request.query.searchQuery}
app.get("/weather", async (request, response) => {
  if (request.query.lat && request.query.lon && request.query.searchQuery) {
    let citySearch = request.query.searchQuery;

    try {
      const API = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEW_WEATHER_API_KEY}&q=${citySearch}&days=7&aqi=no&alerts=no`;
      const res = await axios.get(API);
      if (res.data) {
        const forecast = res.data.forecast.forecastday.map((dayForecast) => {
          return {
            date: dayForecast.date,
            description: dayForecast.day.condition.text,
          };
        });
        response.json(forecast);
      } else {
        response.status(500).json(error);
      }
    } catch (error) {
      response.status(500).json("error api weather");
    }
  } else {
    response.json("Arguments are wrong make sure to enter a lat, lon, searchQuery");
  }

  // local data
  //
  //
  // if (request.query.lat && request.query.lon && request.query.searchQuery) {
  //   let latSearch = request.query.lat.split(".")[0];
  //   let lonSearch = request.query.lon.split(".")[0];
  //   let citySearch = request.query.searchQuery;
  //   let dataCitySearch = data.find((city) => city.city_name.toLowerCase() === citySearch.toLowerCase());
  //   if (dataCitySearch) {
  //     dataCitySearch.lon = dataCitySearch.lon.toString().split(".")[0];
  //     dataCitySearch.lat = dataCitySearch.lat.toString().split(".")[0];
  //     if (dataCitySearch.lon == lonSearch && dataCitySearch.lat == latSearch) {
  //       let forecast = dataCitySearch.data.map((data) => {
  //         let forecastTemp = {
  //           date: data.datetime,
  //           description: data.weather.description,
  //         };
  //         return forecastTemp;
  //       });
  //       response.json(forecast);
  //     } else {
  //       response.status(500).send("No data for your search. Make sure to enter the correct lat, lon, city name");
  //     }
  //   } else {
  //     response.status(500).json(error);
  //   }
  // }
});

app.get("/movies", async (request, response) => {
  let citySearch = request.query.searchQuery;
  try {
    const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${citySearch}&include_adult=false&language=en-US&page=1`;
    const res = await axios.get(API);
    let movies = res.data.results.map((movie) => {
      return {
        title: movie.title,
        overview: movie.overview,
        average_votes: movie.vote_average,
        total_votes: movie.vote_count,
        image_url: movie.poster_path,
        popularity: movie.popularity,
        released_on: movie.release_date,
      };
    });

    response.json(movies);
  } catch (error) {
    response.status(500).json("error api movies");
  }
});

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));
