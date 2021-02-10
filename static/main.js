// Selectors

state = {
  bookList: [],
};

const form = document.querySelector(".bookform");
const titleInput = document.getElementById("book-name");
const authorInput = document.getElementById("book-author");
const codeInput = document.getElementById("book-id");
const messageBox = document.querySelector(".message");
const bookSectionContainer = document.querySelector(".book-list");
const bookListCOntainer = document.querySelector(".item-container");

const clearInputs = function () {
  titleInput.value = "";
  authorInput.value = "";
  codeInput.value = "";
  titleInput.blur();
  authorInput.blur();
  codeInput.blur();
};

const removeMessage = function () {
  messageBox.innerHTML = "";
};

const messageAlert = function (message, category) {
  const markup = `<p class="${category}">${message}</p>`;

  messageBox.insertAdjacentHTML("afterbegin", markup);
  setTimeout(removeMessage, 2000);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const isbn = codeInput.value;
  state.bookList.push({
    title,
    author,
    isbn,
  });
  clearInputs();
  reset();
  loadList();
  messageAlert("Booklist Added", "success");
});

const reset = function () {
  if (state.bookList.length) {
    bookSectionContainer.classList.remove("hidden");
    bookListCOntainer.innerHTML = "";
  }
};

const loadList = function () {
  const markup = state.bookList
    .map((book) => {
      const mark = `<div class="item">
            <h2 class="name">${book.title}</h2>
            <h2 class="author">${book.author}</h2>
            <h2 class="id">${book.isbn}</h2>
            <button class="remove">X</button>
          </div>`;

      return mark;
    })
    .flat();

  bookListCOntainer.insertAdjacentHTML("afterbegin", markup);
};

const renderlist = function () {};

const init = function () {
  loadList();
  reset();
  renderlist();
};
