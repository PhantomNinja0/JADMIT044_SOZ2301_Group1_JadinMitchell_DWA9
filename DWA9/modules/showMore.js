import { books, authors, genres, BOOKS_PER_PAGE } from '../data.js';
import { index } from './helper.js';
import { updateBookList } from '../scripts.js';

let page = 1;
let matches = books;

export const handleListItemClick = (event) => { //function handles click event on book item in list.
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;
  
    for (const node of pathArray) {
      if (active) break;
  
      if (node?.dataset?.preview) { //Retrieves clicked element and finds ancestor element with 'data-preview' attribute.
        for (const singleBook of books) {
          if (singleBook.id === node?.dataset?.preview) { //Matches clicked book with corresponding book object from books array using 'dataset.preview' value.
            active = singleBook;
            break;
          }
        }
      }
    }
  
    if (active) { //If match is founds, it retrieves necessary DOM elements for displaying book details and updates content accordingly.
      index.list.listActive.open = true;
      index.list.listBlur.src = active.image;
      index.list.listImage.src = active.image;
      index.list.listTitle.innerText = active.title;
      index.list.listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
      index.list.listDescription.innerText = active.description;
    }
  }

  

export const handleListButtonClick = () => { //Function handles click even on 'Show more' button in book list.
    const fragment = document.createDocumentFragment(); //Retrieves reference to listItemsElement and creates document fragment. 
  
    for (const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) { //Iterates over 'matches' array, starting from appropriate indec based on current page number.
      const element = createBookElement(book);
      fragment.appendChild(element); //Appends created book elements to document fragment.
    }
  
    index.list.listItems.appendChild(fragment); //Appends document fragment to listItemsElement and increments page counter.
    page += 1;
  }
  