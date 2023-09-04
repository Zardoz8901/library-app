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

class InputValue {
  ifNaN() {
    const pages = Number(inputPages.value);
    if (Number.isNaN(pages)) {
      return 0;
    }
    return pages;
  }

  inputToValue() {
    const author = inputAuthor.value;
    const title = inputTitle.value;
    const pages = this.ifNaN();
    const read = inputRead.checked;
    const bookSum = new Book(author, title, pages, read);
    return library.unshift(bookSum);
  }
}

class SortMethods {
  sortAuthor() {
    const libraryByAuthor = [...library].sort((a, b) =>
      a.author.localeCompare(b.author)
    );
    return libraryByAuthor;
  }

  sortTitle() {
    const libraryByTitle = [...library].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    return libraryByTitle;
  }

  sortPages() {
    const libraryByPages = [...library].sort((a, b) => a.pages - b.pages);
    return libraryByPages;
  }

  sortTime() {
    const libraryByTime = [...library].sort((a, b) => a.time - b.time);
    return libraryByTime;
  }
}

const sort = new SortMethods();

class CreateDestroyBooks {
  InjectBookValue(author, title, pages, read, bookClone) {
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
  addLibrary(sortMethod) {
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
      this.InjectBookValue(author, title, pages, read, bookClone);
    });
  }
  clearInput() {
    inputAuthor.value = "";
    inputTitle.value = "";
    inputPages.value = "";
    inputRead.checked = "";
  }
  removeAllBooks() {
    const classRemove = document.querySelectorAll(".remove");
    classRemove.forEach((e) => e.remove());
  }
}

const createDestroy = new CreateDestroyBooks();

class ClickMethods {
  sortOnClick(methodKey, sortMethod) {
    const clickObject = clickTracker.find((item) => item.method === methodKey);
    if (clickObject.value === true) {
      createDestroy.removeAllBooks();
      createDestroy.addLibrary(sortMethod);
      createDestroy.clearInput();
    } else if (clickObject.value === false) {
      createDestroy.removeAllBooks();
      createDestroy.addLibrary(sortMethod.reverse());
      createDestroy.clearInput();
    }
  }
  clickInverse(methodKey) {
    const clickObject = clickTracker.find((item) => item.method === methodKey);
    clickObject.value = !clickObject.value;
    clickObject.time = new Date().getTime();
    clickTracker.sort((a, b) => a.time - b.time);
    return clickTracker;
  }
}

const clickSort = new ClickMethods();

const clickTracker = [
  { method: "author", value: false, time: "" },
  { method: "title", value: false, time: "" },
  { method: "pages", value: false, time: "" },
  { method: "chrono", value: false, time: "" },
];

cancelModal.addEventListener("click", () => {
  window.setTimeout(() => {
    modal.close();
    createDestroy.clearInput();
  }, 70);
});

submitButton.addEventListener("click", () => {
  const { method } = clickTracker[3];
  createDestroy.removeAllBooks();
  const inputValue = new InputValue();
  inputValue.inputToValue();

  if (method === "chrono") {
    clickSort.sortOnClick(method, sort.sortTime());
  } else if (method === "author") {
    clickSort.sortOnClick(method, sort.sortAuthor());
  } else if (method === "title") {
    clickSort.sortOnClick(method, sort.sortTitle());
  } else if (method === "pages") {
    clickSort.sortOnClick(method, sort.sortPages());
  }
});

class TextMethods {
  replaceText(e) {
    e.target.querySelector(".book-title > span").classList.add("hidden");
    e.target
      .querySelector(".book-title > span:nth-child(2)")
      .classList.remove("hidden");
  }

  restoreText(e) {
    e.target.querySelector(".book-title > span").classList.remove("hidden");
    e.target
      .querySelector(".book-title > span:nth-child(2)")
      .classList.add("hidden");
  }
}

const text = new TextMethods();

class NodeMethods {
  bookNodeId(e) {
    const node = e.target.parentNode.parentNode;
    return node;
  }

  removeBook(e) {
    const node = this.bookNodeId(e);
    return node.remove();
  }

  // Target book index in library
  removeFromLibrary(e) {
    const nodeId = this.bookNodeId(e).id.slice(5);
    library.splice(
      library.findIndex((item) => item.bookId === nodeId),
      1
    );
  }

  // Target book values in library
  changeReadCondition(e) {
    const nodeId = this.bookNodeId(e).id.slice(5);
    const book = library.find((item) => item.bookId === nodeId);
    return book;
  }
}

const nodeTools = new NodeMethods();

class ReadUnreadMethods {
  containsRead(read) {
    read.forEach((item) => {
      if (item.parentNode.classList.contains("book-obscure")) {
        readObscure = true;
      } else if (!item.parentNode.classList.contains("book-obscure")) {
        readObscure = false;
      }
    });
    return unreadObscure;
  }

  containsUnread(unread) {
    unread.forEach((item) => {
      if (item.parentNode.classList.contains("book-obscure")) {
        unreadObscure = true;
      } else if (!item.parentNode.classList.contains("book-obscure")) {
        unreadObscure = false;
      }
    });
    return unreadObscure;
  }

  addObscure(readState) {
    readState.forEach((item) => {
      item.parentNode.classList.add("book-obscure");
    });
  }

  removeObscure(readState) {
    readState.forEach((item) => {
      item.parentNode.classList.remove("book-obscure");
    });
  }
}

const readUnreadTools = new ReadUnreadMethods();

timeButton.addEventListener("click", () => {
  const method = "chrono";
  clickSort.clickInverse(method);
  clickSort.sortOnClick(method, sort.sortTime());
});

bookShelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("author-listen")) {
    const method = "author";
    clickSort.clickInverse(method);
    clickSort.sortOnClick(method, sort.sortAuthor());
  }
});

bookShelf.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("title-listen") &&
    !e.target.classList.contains("remove-book")
  ) {
    const method = "title";
    clickSort.clickInverse(method);
    clickSort.sortOnClick(method, sort.sortTitle());
  }
});

bookShelf.addEventListener("click", (e) => {
  if (e.target.classList.contains("page-listen")) {
    const method = "pages";
    clickSort.clickInverse(method);
    clickSort.sortOnClick(method, sort.sortPages());
  }
});

// Remove books
bookShelf.addEventListener("contextmenu", (e) => {
  // make exception for demo book so next click doesnt remove library object
  if (
    e.target.classList.contains("library-except") &&
    e.target.classList.contains("remove-book")
  ) {
    nodeTools.removeBook(e);
  } else if (e.target.classList.contains("remove-book")) {
    nodeTools.removeBook(e);
    nodeTools.removeFromLibrary(e);
  }
});

bookShelf.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("title-listen")) {
    bombTimer = setTimeout(() => {
      e.target.classList.add("remove-book");
      text.replaceText(e);
    }, 900);
  } else {
    clearTimeout(bombTimer);
  }
});

bookShelf.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("title-listen")) {
    setTimeout(() => {
      text.restoreText(e);
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
    nodeTools.changeReadCondition(e).read = false;
  } else if (e.target.classList.contains("unread")) {
    e.target.classList.remove("unread");
    e.target.classList.add("read");
    nodeTools.changeReadCondition(e).read = true;
  }
  e.preventDefault();
  e.stopPropagation();
});

let unreadObscure = false;
let readObscure = false;

// Obscure unread books and highlight read
readButton.addEventListener("click", () => {
  const read = document.body.querySelectorAll(".read");
  const unread = document.body.querySelectorAll(".unread");
  readUnreadTools.containsUnread(unread);
  readUnreadTools.removeObscure(read);
  readUnreadTools.addObscure(unread);
  if (unreadObscure === true) {
    readUnreadTools.removeObscure(unread);
  }
});

unreadButton.addEventListener("click", () => {
  const read = document.body.querySelectorAll(".read");
  const unread = document.body.querySelectorAll(".unread");
  readUnreadTools.containsRead(read);
  readUnreadTools.addObscure(read);
  readUnreadTools.removeObscure(unread);
  if (readObscure === true) {
    readUnreadTools.removeObscure(read);
  }
});
