window.onload = function letName() {
  document.getElementById("name").focus();
};

const modal = document.querySelector("#modal");
const openModal = document.querySelector(".button-open");
const closeModal = document.querySelector(".button-submit");
const cancelModal = document.querySelector(".button-cancel");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  window.setTimeout(() => {
    modal.close();
  }, 70);
});

const bookNode = document.querySelector("#book-hidden");

const inputAuthor = document.getElementById("author");

const inputTitle = document.getElementById("title");

const inputPages = document.getElementById("pages");

const inputRead = document.getElementById("read");

const submitButton = document.getElementById("submit");

const bookShelf = document.getElementById("container-bookshelf");

const readButton = document.querySelector(".read-color");

const unreadButton = document.querySelector(".unread-color");

const timeButton = document.querySelector(".time-button");

const library = [];

let bombTimer;

// Capture input time for book sorting

class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.time = this.timeStamp();
    this.bookId = this.timeStamp().getTime().toString().slice(8);
  }

  timeStamp() {
    const time = new Date(Date.now());
    return time;
  }
}

function ifNaN() {
  const pages = Number(inputPages.value);
  if (Number.isNaN(pages)) {
    return 0;
  }
  return pages;
}

function inputToValue() {
  const author = inputAuthor.value;
  const title = inputTitle.value;
  const pages = ifNaN();
  const read = inputRead.checked;
  const bookSum = new Book(author, title, pages, read);
  return library.unshift(bookSum);
}

function sortAuthor() {
  const libraryByAuthor = [...library].sort((a, b) =>
    a.author.localeCompare(b.author)
  );
  return libraryByAuthor;
}

function sortTitle() {
  const libraryByTitle = [...library].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  return libraryByTitle;
}

function sortPages() {
  const libraryByPages = [...library].sort((a, b) => a.pages - b.pages);
  return libraryByPages;
}

function sortTime() {
  const libraryByTime = [...library].sort((a, b) => a.time - b.time);
  return libraryByTime;
}

function InjectBookValue(author, title, pages, read, bookClone) {
  const book = bookClone;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  book.classList.add("remove");
  book.querySelector(".book-author > span").innerText = `${author}`;
  book.querySelector(".book-title > span").innerText = `${title}`;
  book.querySelector(".book-pages > span").innerText = `${pages}`;
  if (read === true) {
    book.querySelector(".book-pages").classList.add("read");
  } else {
    book.querySelector(".book-pages").classList.add("unread");
  }
}

function clearInput() {
  inputAuthor.value = "";
  inputTitle.value = "";
  inputPages.value = "";
  inputRead.checked = "";
}

function removeAllBooks() {
  const classRemove = document.querySelectorAll(".remove");
  classRemove.forEach((e) => e.remove());
}

function addLibrary(sortMethod) {
  const ofLibrary = sortMethod;
  ofLibrary.forEach((key) => {
    const { author } = key;
    const { title } = key;
    const { pages } = key;
    const { read } = key;
    const { time } = key;
    const bookClone = bookNode.cloneNode(true);
    // Inject input time as book id
    bookClone.id = `book-${time.getTime().toString().slice(8)}`;
    bookClone.classList.remove("hidden");
    bookNode.before(bookClone);
    InjectBookValue(author, title, pages, read, bookClone);
  });
}

cancelModal.addEventListener("click", () => {
  window.setTimeout(() => {
    modal.close();
    clearInput();
  }, 70);
});

const clickTracker = [
  { method: "author", value: false, time: "" },
  { method: "title", value: false, time: "" },
  { method: "pages", value: false, time: "" },
  { method: "chrono", value: false, time: "" },
];

function clickInverse(methodKey) {
  const clickObject = clickTracker.find((item) => item.method === methodKey);
  clickObject.value = !clickObject.value;
  clickObject.time = new Date().getTime();
  clickTracker.sort((a, b) => a.time - b.time);
  return clickTracker;
}

function sortOnClick(methodKey, sortMethod) {
  const clickObject = clickTracker.find((item) => item.method === methodKey);
  if (clickObject.value === true) {
    removeAllBooks();
    addLibrary(sortMethod);
    clearInput();
  } else if (clickObject.value === false) {
    removeAllBooks();
    addLibrary(sortMethod.reverse());
    clearInput();
  }
}

submitButton.addEventListener("click", () => {
  const { method } = clickTracker[3];
  removeAllBooks();
  inputToValue();
  if (method === "chrono") {
    sortOnClick(method, sortTime());
  } else if (method === "author") {
    sortOnClick(method, sortAuthor());
  } else if (method === "title") {
    sortOnClick(method, sortTitle());
  } else if (method === "pages") {
    sortOnClick(method, sortPages());
  }
  console.log(method);
  console.log(library);
});

function replaceText(e) {
  e.target.querySelector(".book-title > span").classList.add("hidden");
  e.target
    .querySelector(".book-title > span:nth-child(2)")
    .classList.remove("hidden");
}

function restoreText(e) {
  e.target.querySelector(".book-title > span").classList.remove("hidden");
  e.target
    .querySelector(".book-title > span:nth-child(2)")
    .classList.add("hidden");
}

function bookNodeId(e) {
  const node = e.target.parentNode.parentNode;
  return node;
}

function removeBook(e) {
  const node = bookNodeId(e);
  return node.remove();
}

// Target book index in library
function removeFromLibrary(e) {
  const nodeId = bookNodeId(e).id.slice(5);
  library.splice(
    library.findIndex((item) => item.bookId === nodeId),
    1
  );
}

// Target book values in library
function changeReadCondition(e) {
  const nodeId = bookNodeId(e).id.slice(5);
  const book = library.find((item) => item.bookId === nodeId);
  return book;
}

timeButton.addEventListener("click", () => {
  const method = "chrono";
  clickInverse(method);
  sortOnClick(method, sortTime());
});

bookShelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("author-listen")) {
    const method = "author";
    clickInverse(method);
    sortOnClick(method, sortAuthor());
  }
});

bookShelf.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("title-listen") &&
    !e.target.classList.contains("remove-book")
  ) {
    const method = "title";
    clickInverse(method);
    sortOnClick(method, sortTitle());
  }
});

bookShelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-listen")) {
    const method = "pages";
    clickInverse(method);
    sortOnClick(method, sortPages());
  }
});

// Remove books
bookShelf.addEventListener("contextmenu", (e) => {
  // make exception for demo book so next click doesnt remove library object
  if (
    e.target.classList.contains("library-except") &&
    e.target.classList.contains("remove-book")
  ) {
    removeBook(e);
  } else if (e.target.classList.contains("remove-book")) {
    removeBook(e);
    removeFromLibrary(e);
  }
});

bookShelf.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("title-listen")) {
    bombTimer = setTimeout(() => {
      e.target.classList.add("remove-book");
      replaceText(e);
    }, 900);
  } else {
    clearTimeout(bombTimer);
  }
});

bookShelf.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("title-listen")) {
    setTimeout(() => {
      restoreText(e);
    }, 100);
    setTimeout(() => {
      e.target.classList.remove("remove-book");
    }, 400);
  }
});

bookShelf.addEventListener("contextmenu", (e) => {
  if (
    e.target.classList.contains("book-pages") &&
    e.target.classList.contains("book-pages")
  ) {
    e.preventDefault();
    e.stopPropagation();
  }
});

// Right click on pages to change read status
// Add function to change target book value in library
bookShelf.addEventListener("contextmenu", (e) => {
  if (e.target.classList.contains("read")) {
    e.target.classList.remove("read");
    e.target.classList.add("unread");
    changeReadCondition(e).read = false;
  } else if (e.target.classList.contains("unread")) {
    e.target.classList.remove("unread");
    e.target.classList.add("read");
    changeReadCondition(e).read = true;
  }
  e.preventDefault();
  e.stopPropagation();
});

let unreadObscure = false;
let readObscure = false;

function containsRead(read) {
  read.forEach((item) => {
    if (item.parentNode.classList.contains("book-obscure")) {
      readObscure = true;
    } else if (!item.parentNode.classList.contains("book-obscure")) {
      readObscure = false;
    }
  });
  return unreadObscure;
}

function containsUnread(unread) {
  unread.forEach((item) => {
    if (item.parentNode.classList.contains("book-obscure")) {
      unreadObscure = true;
    } else if (!item.parentNode.classList.contains("book-obscure")) {
      unreadObscure = false;
    }
  });
  return unreadObscure;
}

function addObscure(readState) {
  readState.forEach((item) => {
    item.parentNode.classList.add("book-obscure");
  });
}

function removeObscure(readState) {
  readState.forEach((item) => {
    item.parentNode.classList.remove("book-obscure");
  });
}

// Obscure unread books and highlight read
readButton.addEventListener("click", () => {
  const read = document.body.querySelectorAll(".read");
  const unread = document.body.querySelectorAll(".unread");
  containsUnread(unread);
  removeObscure(read);
  addObscure(unread);
  if (unreadObscure === true) {
    removeObscure(unread);
  }
});

unreadButton.addEventListener("click", () => {
  const read = document.body.querySelectorAll(".read");
  const unread = document.body.querySelectorAll(".unread");
  containsRead(read);
  addObscure(read);
  removeObscure(unread);
  if (readObscure === true) {
    removeObscure(read);
  }
});
