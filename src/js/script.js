
{
  'use strict';

  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    all: {
      booksImage: '.book__image',
      bookId: 'data-id',
      form: '.filters',
    },

  };
  const classNames = {
    favorite: 'favorite',
    hidden: 'hidden'
  };

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBooks = this;

      thisBooks.initData();
      thisBooks.getElements();
      thisBooks.render();
      thisBooks.initActions();
    }

    initData() {
      const thisBooks = this;

      thisBooks.data = dataSource.books;
      thisBooks.favoriteBooks = [];
      thisBooks.filters = [];
    }

    getElements() {
      const thisBooks = this;

      thisBooks.dom = {};
      thisBooks.dom.clickedElement = document.querySelector(select.containerOf.booksList);
      thisBooks.dom.formElem = document.querySelector(select.all.form);
      thisBooks.dom.booksContainer = document.querySelector(select.containerOf.booksList);

    }

    render() {
      const thisBooks = this;

      for(let book of this.data){

        const ratingBgc = thisBooks.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        const generatedHTML = templates.booksTemplate({
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc,
          ratingWidth,
        });

        thisBooks.element = utils.createDOMFromHTML(generatedHTML);
        thisBooks.dom.booksContainer = document.querySelector(select.containerOf.booksList);
        thisBooks.dom.booksContainer.appendChild(thisBooks.element);
      }
    }

    initActions() {

      const thisBooks = this;

      thisBooks.dom.clickedElement.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const eventTarget = event.target.offsetParent;
        const attribute = eventTarget.getAttribute(select.all.bookId);

        if (!thisBooks.favoriteBooks.includes(attribute)) {
          eventTarget.classList.add(classNames.favorite);
          thisBooks.favoriteBooks.push(attribute);
          console.log('Favorite books:', thisBooks.favoriteBooks);
        } else {
          eventTarget.classList.remove(classNames.favorite);
          thisBooks.favoriteBooks.splice(thisBooks.favoriteBooks.indexOf(attribute), 1);
          console.log('Favorite books:', thisBooks.favoriteBooks);

        }
      });

      thisBooks.dom.formElem.addEventListener('change', function (event) {
        event.preventDefault();
        const clickedElem = event.target;

        if (clickedElem.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
          console.log(clickedElem.value);

          if (clickedElem.checked == true) {
            thisBooks.filters.push(clickedElem.value);
            console.log('Filters:', thisBooks.filters);
          } else {
            const indexOfFilters = thisBooks.filters.indexOf(clickedElem.value);
            thisBooks.filters.splice(indexOfFilters, 1);
            console.log('Filters:', thisBooks.filters);
          }
        }
        thisBooks.filterBooks();
      });
    }

    filterBooks() {

      const thisBooks = this;

      for (let book of thisBooks.data) {
        let shouldBeHidden = false;
        for (let filter of thisBooks.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const findBook = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if (shouldBeHidden == true) {
          findBook.classList.add('hidden');
        } else {
          findBook.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';

      if (rating < 6) {
        background = 'linear - gradient(to bottom,  #fefcea 0 %, #f1da36 100 %)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear - gradient(to bottom, #b4df5b 0 %,#b4df5b 100 %)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear - gradient(to bottom, #299a0b 0 %, #299a0b 100 %)';
      } else if (rating > 9) {
        background = 'linear - gradient(to bottom, #ff0084 0 %,#ff0084 100 %)';
      }

      return background;

    }
  }

  const app = new BooksList();
  console.log('app:', app);
}