window.onload = function () {
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
  this.bookId = timeStamp().getTime().toString().slice(8);
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
    /* Inject input time as book id */
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

submitButton.addEventListener("click", () => {
  removeAllBooks();
  inputToValue();
  addLibrary(sortTime());
  clearInput();
});

let authorClick = "";
let titleClick = "";
let pageClick = "";

function authorClickIncrement() {
  return authorClick++;
}

function titleClickIncrement() {
  return titleClick++;
}

function pageClickIncrement() {
  return pageClick++;
}

function readClickIncrement() {
  return readClick++;
}

function unreadClickIncrement() {
  return unreadClick++;
}

function sortOnClick(methodClickIncrement, methodClick, sortMethod) {
  // eslint-disable-next-line no-unused-expressions
  methodClickIncrement;
  if (methodClick % 2 === 0) {
    removeAllBooks();
    addLibrary(sortMethod.reverse());
    clearInput();
  } else {
    removeAllBooks();
    addLibrary(sortMethod);
    clearInput();
  }
}

let bombTimer;

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
  console.log(e);
  return node;
}

function removeBook(e) {
  const node = bookNodeId(e);
  const nodeRemove = node.remove();
}

function removeFromLibrary(e) {
  const nodeId = bookNodeId(e).id.slice(5);
  library.splice(
    library.findIndex((item) => item.bookId === nodeId),
    1
  );
}

bookShelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("author-listen")) {
    sortOnClick(authorClickIncrement(), authorClick, sortAuthor());
  }
});

bookShelf.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("title-listen") &&
    !e.target.classList.contains("remove-book")
  ) {
    sortOnClick(titleClickIncrement(), titleClick, sortTitle());
  } else if (e.target.classList.contains("remove-book")) {
    removeBook(e);
    removeFromLibrary(e);
  }
});

bookShelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-listen")) {
    sortOnClick(pageClickIncrement(), pageClick, sortPages());
  }
});

bookShelf.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("title-listen")) {
    bombTimer = setTimeout(() => {
      e.target.classList.add("remove-book");
      replaceText(e);
    }, 1300);
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
    }, 800);
  }
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
