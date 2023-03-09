const modal = document.querySelector("#modal");
const openModal = document.querySelector(".button-open");
const closeModal = document.querySelector(".button-close");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

const bookNode = document.querySelector("#book");

const inputAuthor = document.getElementById("author");

const inputTitle = document.getElementById("title");

const inputPages = document.getElementById("pages");

const inputRead = document.getElementById("read");

const submitButton = document.getElementById("submit");

const library = [];

/* Capture input time for book sorting */
function timeStamp() {
  const time = new Date(Date.now());
  return time;
}

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.time = timeStamp();
}

function inputToValue() {
  const author = inputAuthor.value;
  const title = inputTitle.value;
  const pages = Number(inputPages.value);
  const read = inputRead.checked;
  const bookSum = new Book(author, title, pages, read);
  return library.unshift(bookSum);
}

function sortAuthor() {
  const libraryByAuthor = [...library].sort((a, b) =>
    a.author.localeCompare(b.author)
  );
  console.log(libraryByAuthor);
  return libraryByAuthor;
}

function sortTitle() {
  const libraryByTitle = [...library].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  console.log(libraryByTitle);
  return libraryByTitle;
}

function sortPages() {
  const libraryByPages = [...library].sort((a, b) => a.pages - b.pages);
  console.log(libraryByPages);
  return libraryByPages;
}

function sortTime() {
  const libraryByTime = [...library].sort((a, b) => a.time - b.time);
  console.log(libraryByTime);
  return libraryByTime;
}

function cloneNode() {
  const bookClone = bookNode.cloneNode(true);
  console.log(bookClone);
  bookClone.id = `book${library.length}`;
  bookClone.classList.remove("hidden-book");
  bookNode.after(bookClone);
}

function clearInput() {
  inputAuthor.value = "";
  inputTitle.value = "";
  inputPages.value = "";
  inputRead.checked = "";
}

submitButton.addEventListener("click", () => {
  inputToValue();
  sortAuthor();
  sortTitle();
  sortPages();
  sortTime();
  cloneNode();
  clearInput();
});
