import { addMovieHandler, deleteMovieHandler, searchMovieHandler, getMoviesHandler, updateMovieHandler } from '../handler/moviesHandler.js';
import { getValueByQuestion, closeReadLine } from '../utils/readLine.service.js';

const displayMenu = () => {
  console.log('========= Movie Catalog App =========');
  console.log('1. Add Movie');
  console.log('2. Delete Movie');
  console.log('3. Search Movie');
  console.log('4. Get All Movies');
  console.log('5. Update Movie');
  console.log('6. Exit');
};

const displaySearchMenu = () => {
    console.log('========= Select search criteria =========');
    console.log('1. title');
    console.log('2. director');
    console.log('3. release_year');
    console.log('4. genre');
};

const searchUserInput = async () => {
    displaySearchMenu();
    const choice = await getValueByQuestion('Enter your choice (1-4):');
    switch (choice) {
        case '1':
            await searchMovieHandler('title');
            break;
        case '2':
            await searchMovieHandler('director');
            break;
        case '3':
            await searchMovieHandler('release_year');
            break;
        case '4':
            await searchMovieHandler('genre');
            break;
        default:
            console.log('Invalid choice. Please try again.');
            break;
    }
};
const processUserInput = async (choice) => {
  switch (choice) {
    case '1':
      await addMovieHandler();
      break;
    case '2':
      await deleteMovieHandler();
      break;
    case '3':
      await searchUserInput();
      break;
    case '4':
      await getMoviesHandler();
      break;
    case '5':
      await updateMovieHandler();
      break;
    case '6':
      console.log('Exiting...');
      closeReadLine();
      return;
    default:
      console.log('Invalid choice. Please try again.');
      break;
  }

  displayMenu();
  getUserChoice();
};

const getUserChoice = async () => {
  const choice = await getValueByQuestion('Enter your choice (1-6):');
  processUserInput(choice);
};

export const startApp = () => {
  displayMenu();
  getUserChoice();
};