import { books, authors, genres, BOOKS_PER_PAGE } from '../data.js';
import { index } from './helper.js';

class BookPreview {
  /**
  * when event fires/book clicked on, it brings up an image and a blurb.
  */
  previewClick(event) {
      const pathArray = Array.from(event.path || event.composedPath());
      let active = null;

      for (const node of pathArray) {
          if (active) {
              break;
          }
          const previewId = node?.dataset?.preview

          for (const singleBook of books) {
              if (singleBook.id === previewId) {
                  active = singleBook
              }
          }
      }

      if (!active) {
          return;
      }
      index.list.listActive.open = true;
      index.list.listImage.src = active.image;
      index.list.listBlur.src = active.image;
      index.list.listTitle.textContent = active.title;
      index.list.listSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
      index.list.listDescription.textContent = active.description;
  };
};

const bookPreview = new BookPreview();

index.list.listItems.addEventListener('click', (event) => {
  bookPreview.previewClick(event);
});

export function createBookElement({ author, id, image, title }) { //function takes a book object as input and creates an HTML element representing the book.
    const element = document.createElement('button');
    element.classList = 'preview'; //Creates button element with class 'preview' and sets data-preview attribute to book's ID. 
    element.setAttribute('data-preview', id);
  //Creates an image and div element inside button for displaying book's title and author. 
    element.innerHTML = ` 
      <img
        class="preview__image"
        src="${image}"
      />
      
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;
  
    return element; //Function returns created element.
  }

  