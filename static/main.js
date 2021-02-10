// Selectors

state = {
  bookList: [],
};

const form = document.querySelector(".bookform");
const titleInput = document.getElementById("book-name");
const authorInput = document.getElementById("book-author");
const codeInput = document.getElementById("book-id");
const messageBox = document.querySelector(".message");

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
  messageAlert("Booklist Added", "success");
});
