const modal = document.querySelector("#modal");
const openModal = document.querySelector(".button-open");
const closeModal = document.querySelector(".button-close");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

const bookAuthor = document.querySelector(".book-author > span");

const bookName = document.querySelector(".book-title > span");

const bookPages = document.querySelector(".book-pages > span");

const bookNode = document.querySelector("#book");

const bookClone = bookNode.cloneNode(true);

console.log(bookClone);

const inputAuthor = document.getElementById("author");

const inputTitle = document.getElementById("title");

const inputPages = document.getElementById("pages");

const inputRead = document.getElementById("read");

const inputUnread = document.getElementById("unread");

const submitButton = document.getElementById("submit");

const Library = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function inputToValue() {
  const author = inputAuthor.value;
  const title = inputTitle.value;
  const pages = Number(inputPages.value);
  const read = inputRead.checked;
  const book = new Book(author, title, pages, read);
  return Library.unshift(book);
}

submitButton.addEventListener("click", (e) => {
  inputToValue();
  console.log(Library);
});
