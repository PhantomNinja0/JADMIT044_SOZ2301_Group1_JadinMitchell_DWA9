import { books, authors, genres, BOOKS_PER_PAGE } from '../data.js';
import { index } from './helper.js';
import { updateBookList } from '../scripts.js';

let matches = books;

export const createGenre = () => {
    const optionGenres = document.createDocumentFragment();
    const genreElement = document.createElement("option");
    genreElement.value = "any";
    genreElement.innerText = "All Genres";
    optionGenres.appendChild(genreElement);
  
    for (const [id, name] of Object.entries(genres)) {
      const options = document.createElement("option");
  
      options.value = id;
      options.innerText = name;
  
      optionGenres.appendChild(options);
    }
    return optionGenres;
  };

export const createAuthor = () => {
    const optionAuthors = document.createDocumentFragment();
    const AuthorElement = document.createElement("option");
    AuthorElement.value = "any";
    AuthorElement.innerText = "All Authors";
    optionAuthors.appendChild(AuthorElement);
  
    for (const [id, name] of Object.entries(authors)) {
      const options = document.createElement("option");
  
      options.value = id;
      options.innerText = name;
  
      optionAuthors.appendChild(options);
    }
    return optionAuthors;
  };
  
export const handleSearchFormSubmit = (event) => { //Fuction handles submission of search form.
    event.preventDefault();
    const formData = new FormData(index.search.searchForm);
    const filters = Object.fromEntries(formData);
    const result = []; // will hold the filtered books
    let page = 1;
    for (const book of books) {
      const titleMatch =
        filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch =
        filters.author === "any" || book.author === filters.author;
      const genreMatch =
        filters.genre === "any" || book.genres.includes(filters.genre);
  
      if (authorMatch && genreMatch && titleMatch) {
        result.push(book);
      }
    }
    
    page = 1; //After filtering, resets the page counter.
    matches = result;
    updateBookList(result); //Updates book list by calling 'updateBookList' with 'result' array.
  
    window.scrollTo({ top: 0, behavior: 'smooth' }); //Scrolls to top of page.
    index.search.searchOverlay.open = false; //Closes search overlay.
    index.search.searchForm.reset(); //Resets search form.
  }
