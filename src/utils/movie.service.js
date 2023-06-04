import { error } from 'console';
import { fetchMovieData } from '../api/apiRequest.js'; 
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../../json/movies.json');

export const generateUniqueMovieId = () => {
    const movies = getAllMovies();
    const maxId = movies.reduce((max, movie) => Math.max(max, movie.id || 0), 0);
    const newId = maxId + 1;
    return newId;
}

export const getAllMovies = () => {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const movies = JSON.parse(jsonData);
    return movies;
};

export const addMovie = (movie) => {
    const movies = getAllMovies();
    movies.push(movie);
    const updatedJsonData = JSON.stringify(movies, null, 2);
    fs.writeFileSync(filePath, updatedJsonData, 'utf-8');
    enhanceMovieCatalog();
};

export const deleteMovie = async (id) => {
    const movies = getAllMovies();
    const movieIndexToDelete = movies.findIndex((movie) => movie.id === Number(id));
    if (movieIndexToDelete != -1) {
      movies.splice(movieIndexToDelete, 1);
      const updatedJsonData = JSON.stringify(movies, null, 2);
      fs.writeFileSync(filePath, updatedJsonData, 'utf-8');
      console.log('Movie deleted successfully.');
    } else {
      throw new Error(`Movie with id ${id} not found.`);
    }
};

export const searchMovie = async (criteria, type) => {
  const movies = getAllMovies();
  let moviesToSearch = [];

  if (criteria === 'title') {
    moviesToSearch = movies.filter((movie) => movie.title.includes(type));
  } else if (criteria === 'director') {
    moviesToSearch = movies.filter((movie) => movie.director.includes(type));
  } else if (criteria === 'release_year') {
    moviesToSearch = movies.filter((movie) => movie.release_year === type);
  } else if (criteria === 'genre') {
    moviesToSearch = movies.filter((movie) => movie.genre.includes(type));
  }

  if (moviesToSearch.length > 0) {
    return moviesToSearch;
  } else {
    throw new Error('Movies not found.');
  }
};

export const updateMovie = async (id, updatedMovie) => {
  const movies = getAllMovies();
  const movieToUpdate = movies.find((movie) => movie.id === Number(id));
  if (movieToUpdate) {
    movieToUpdate.title = updatedMovie.title;
    movieToUpdate.director = updatedMovie.director;
    movieToUpdate.release_year = updatedMovie.release_year;
    movieToUpdate.genre = updatedMovie.genre;
    
    const updatedJsonData = JSON.stringify(movies, null, 2);
    fs.writeFileSync(filePath, updatedJsonData, 'utf-8');
    console.log('Movie updated successfully.');
  } else {
    throw new Error('Movie not found.');
  }
};

const enhanceMovieCatalog = async () => {
  const movies = getAllMovies();
  for (const movie of movies) {
    await fetchMovieData(movie);
  }
    
  const updatedJsonData = JSON.stringify(movies, null, 2);
  fs.writeFileSync(filePath, updatedJsonData, 'utf-8');
}