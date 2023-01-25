function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    if (read === true) {
      return `${title} by ${author}, ${pages} pages, you have read the book.`;
    }
    return `${title} by ${author}, ${pages} pages, you have not read the book yet.`;
  };
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

console.log(theHobbit.info());

