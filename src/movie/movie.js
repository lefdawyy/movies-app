function Movie(id, title, director, release_year, genre) {
    this.id = id;
    this.title = title;
    this.director = director;
    this.release_year = release_year;
    this.genre = genre;
}

Movie.prototype.print = function () {
    console.log(`${this.id}- ${this.title} movie, released in ${this.release_year}, by ${this.director}, and the genre is ${this.genre}`);
}

export default Movie;