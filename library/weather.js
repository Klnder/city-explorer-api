require("dotenv").config();
const axios = require("axios");

async function weather(request, response) {
  if (request.query.searchQuery) {
    let citySearch = request.query.searchQuery;

    try {
      const API = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEW_WEATHER_API_KEY}&q=${citySearch}&days=7&aqi=no&alerts=no`;
      const res = await axios.get(API);
      if (res.data) {
        const forecast = res.data.forecast.forecastday.map((dayForecast) => {
          return {
            date: dayForecast.date,
            description: dayForecast.day.condition.text,
            icon: dayForecast.day.condition.icon,
            mintemp: dayForecast.day.mintemp_c,
            maxtemp: dayForecast.day.maxtemp_c,
          };
        });
        response.json(forecast);
      } else {
        response.status(500).json("error retrieving data");
      }
    } catch (error) {
      response.status(500).json("error api weather");
    }
  } else {
    response.status(500).json("Arguments are wrong: need to have a searchQuery");
  }
}

module.exports = weather;
