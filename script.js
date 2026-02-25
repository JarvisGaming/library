const books = [];
const bookDisplay = document.querySelector("#books");
const bookTemplate = document.querySelector("template")
console.log(bookTemplate);

function Book(title, author, pages, hasRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.hasRead ? "already read" : "not read yet"}`;
    }
}

function addBookToLibrary(title, author, pages, hasRead) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, pages, hasRead);
    books.push([id, book]);
}

function displayAllBooks(){
    for (const [id, book] of books){
        const bookInstance = bookTemplate.content.cloneNode(true);
        bookInstance.querySelector(".title").textContent = book.title;
        bookInstance.querySelector(".author").textContent = book.author;
        bookInstance.querySelector(".pages").textContent = book.pages;
        bookInstance.querySelector(".has-read").textContent = book.hasRead ? "Yes" : "No";
        bookDisplay.appendChild(bookInstance);
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("A Comprehensive Guide To Mapping Taiko", "JarvisGaming", 87, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("A Comprehensive Guide To Mapping Taiko", "JarvisGaming", 87, true);
displayAllBooks();