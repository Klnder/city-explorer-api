require("dotenv").config;
const axios = require("axios");

async function restaurant(request, response) {
  if (request.query.searchQuery) {
    let citySearch = request.query.searchQuery;
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    try {
      const API = `https://api.yelp.com/v3/businesses/search?location=${citySearch}&limit=20&term=restaurant&price=1&price=2&price=3&sort_by=rating`;
      const res = await reqInstance.get(API);

      if (res.data) {
        let restaurants = res.data.businesses.map((restaurant) => {
          return {
            id: restaurant.id,
            name: restaurant.name,
            image_url: restaurant.image_url,
            url: restaurant.url,
            rating: restaurant.rating,
            price: restaurant.price,
            address: restaurant.location.display_address,
          };
        });
        response.json(restaurants);
      } else {
        response.status(500).json("error retrieving data");
      }
    } catch (error) {
      response.json("error api restaurant");
    }
  } else {
    response.json("Arguments are wrong: need to have a searchQuery");
  }
}

module.exports = restaurant;
