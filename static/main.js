state = {
  bookList: [],
};
// Selectors

const form = document.querySelector(".bookform");
const titleInput = document.getElementById("book-name");
const authorInput = document.getElementById("book-author");
const codeInput = document.getElementById("book-id");
const messageBox = document.querySelector(".message");
const bookSectionContainer = document.querySelector(".book-list");
const bookListCOntainer = document.querySelector(".item-container");
const removeBtn = document.querySelector(".remove");

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
  addItem({
    title,
    author,
    isbn,
  });
  clearInputs();
  render();
  messageAlert("Book Added", "success");
});

bookListCOntainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".remove");
  if (!btn) return;
  const id = btn.parentElement.dataset.id;
  const el = state.bookList.filter((item) => item.id === id)[0];
  deleteItem(el);
  render();
  messageAlert("Book Removed", "danger");
});

const addItem = function (item) {
  const id = (Date.now() + "").slice(-10);
  item = {
    id,
    title: item.title,
    author: item.author,
    isbn: item.isbn,
  };
  state.bookList.push(item);
  localStorage.setItem("booklist", JSON.stringify(state.bookList));
};

const deleteItem = function (item) {
  state.bookList.splice(state.bookList.indexOf(item), 1);
  localStorage.setItem("booklist", JSON.stringify(state.bookList));
};

const loadList = function () {
  const mylist = localStorage.getItem("booklist");
  if (!mylist) return;
  state.bookList = JSON.parse(mylist);
};

const render = function () {
  if (state.bookList.length) {
    bookSectionContainer.classList.remove("hidden");
    bookListCOntainer.innerHTML = "";
    renderlist();
  } else {
    bookListCOntainer.innerHTML = "";
    bookSectionContainer.classList.add("hidden");
  }
};

const renderlist = function () {
  const markup = state.bookList
    .map((book) => {
      const mark = `<div class="item" data-id="${book.id}">
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

const init = function () {
  loadList();
  render();
};

init();
