import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { index } from './modules/helper.js';
import { applyTheme } from './modules/theme.js';
import { createBookElement } from './modules/bookPreview.js';
import { handleListItemClick, handleListButtonClick } from './modules/showMore.js';
import { createGenre, createAuthor, handleSearchFormSubmit } from './modules/search.js';

let page = 1;
let matches = books;

function updateBookList(result) { //function updates book list based on provided result data.
  const listMessageElement = index.list.listMessage; //Finds and stores references to necessary DOM elements.
  const listItemsElement = index.list.listItems;
  const listButtonElement = index.list.listButton;

  if (result.length < 1) { //Checks if result array is empty and shows/hides list message accordingly.
    listMessageElement.classList.add('list__message_show');
  } else {
    listMessageElement.classList.remove('list__message_show');
  }

  listItemsElement.innerHTML = ''; //Clears existing list items in listItemsElement.
  const newItems = document.createDocumentFragment(); //Creates new document fragment to hold new list items.

  for (const book of result.slice(0, BOOKS_PER_PAGE)) { //Iterates over result array and calls 'createBookElement' for each book.
    const element = createBookElement(book);
    newItems.appendChild(element); //Appends document fragment to listItemsElement.
  }

  listItemsElement.appendChild(newItems);
  listButtonElement.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1; //Updates disabled state and content of listButtomElement based on number of remaining books.
//Updates inner HTML of listButtonElement to display remaining books. 
  listButtonElement.innerHTML = ` 
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
  `;
}

index.search.searchGenres.appendChild(createGenre())

index.search.searchAuthors.appendChild(createAuthor())

// Event Listeners
index.search.searchCancel.addEventListener('click', () => {
  index.search.searchOverlay.open = false;
  index.search.searchForm.reset();
});

index.list.listClose.addEventListener('click', () => {
  index.list.listActive.open = false;
  });

index.settings.settingsCancel.addEventListener('click', () => {
  index.settings.settingsOverlay.open = false;
});

index.search.searchIcon.addEventListener('click', () => {
  index.search.searchOverlay.open = true;
  index.search.searchTitle.focus();
});

index.settings.settingsIcon.addEventListener('click', () => {
  index.settings.settingsOverlay.open = true;
});

index.settings.settingsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }

  index.settings.settingsOverlay.open = false;
});

index.search.searchForm.addEventListener('submit', handleSearchFormSubmit);

index.list.listButton.addEventListener('click', handleListButtonClick);

index.list.listItems.addEventListener('click', handleListItemClick);

// Initial setup
applyTheme();
updateBookList(matches);

export {updateBookList};