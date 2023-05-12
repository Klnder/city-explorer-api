require("dotenv").config();
const axios = require("axios");

async function movie(request, response) {
  let citySearch = request.query.searchQuery;
  try {
    const APIKeyword = `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.MOVIE_API_KEY}&query=${citySearch}&page=1`;

    const resKeyword = await axios.get(APIKeyword);
    let idSearch = resKeyword.data.results[0].id;

    const API = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIE_API_KEY}&with_keywords=${idSearch}&include_adult=false&include_video=false&page=1&sort_by=popularity.desc`;

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
}
module.exports = movie;
