const Library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

console.log(theHobbit);

function addBookToLibrary() {}

const modal = document.querySelector("#modal");
const openModal = document.querySelector(".button-open");
const closeModal = document.querySelector(".button-close");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

const book = document.querySelector(".book > div > span");

console.log(book);
