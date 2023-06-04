import {getAllMovies, addMovie, deleteMovie, searchMovie, updateMovie, generateUniqueMovieId} from "../utils/movie.service.js";
import Movie from '../movie/movie.js';
import { getValueByQuestion, getValuesBasedOnQuestions } from "../utils/readLine.service.js";

export const addMovieHandler = async () => {
    const id = generateUniqueMovieId();
    const questions = [
        'Enter title: ',
        'Enter director name: ',
        'Enter release year: ',
        'Enter genre: ',
    ];
    const [title, director, release_year, genre] = await getValuesBasedOnQuestions(questions);
    const movie = new Movie(id, title, director, release_year, genre);
    addMovie(movie);
};

export const deleteMovieHandler = async () => {
    try {
        await getMoviesHandler();
        const id = await getValueByQuestion("Enter movie id: ");
        await deleteMovie(id);
    } catch (error) {
        console.log(error.message);
    }
}

export const searchMovieHandler = async (criteria) => {
    try {
        const type = await getValueByQuestion(`Enter movie ${criteria}: `);
        const movies = await searchMovie(criteria ,type);
        movies.forEach((movie) => {
            const { id, title, director, release_year, genre } = movie;
            const movieObj = new Movie(id, title, director, release_year, genre);
            movieObj.print();
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getMoviesHandler = async () => {
    try {
        const movies = await getAllMovies();
        movies.forEach((movie) => {
            const { id, title, director, release_year, genre } = movie;
            const movieObj = new Movie(id, title, director, release_year, genre);
            movieObj.print();
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateMovieHandler = async () => {
    try {
        await getMoviesHandler();
        const id = await getValueByQuestion("Enter movie id: ");
        const questions = [
            'Enter title: ',
            'Enter director name: ',
            'Enter release year: ',
            'Enter genre: ',
        ];
        const [title, director, release_year, genre] = await getValuesBasedOnQuestions(questions);
        const movie = new Movie(id, title, director, release_year, genre);
        updateMovie(id, movie);
    } catch (error) {
        console.log(error.message);
    }
};