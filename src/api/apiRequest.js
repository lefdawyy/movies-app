import fetch from 'node-fetch';

export const fetchMovieData = async (movie) => {
  const apiKey = 'dddc05d7';
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie.title}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    if (data.Response === 'True') {
      const { Plot, Ratings, Poster } = data;
      movie.plot = Plot;
      movie.ratings = Ratings;
      movie.poster = Poster;
    } else {
      console.log(`\nError fetching data for "${movie.title}" - ${data.Error}`);
    }
  } catch (error) {
      console.log(`\nError fetching data for "${movie.title}" - ${error}`);
  }
}