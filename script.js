const books = new Map();
const bookDisplay = document.querySelector("#books");
const bookTemplate = document.querySelector("template")

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

Book.prototype.changeHasRead = function(){
    this.hasRead = !this.hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    const book = new Book(title, author, pages, hasRead);
    books.set(crypto.randomUUID(), book);
}

function updateBookDisplay(){
    // Clear all books, if any
    bookDisplay.innerHTML = "";

    for (const [id, book] of books){
        const bookInstance = bookTemplate.content.cloneNode(true);
        bookInstance.querySelector(".title").textContent = book.title;
        bookInstance.querySelector(".author").textContent = book.author;
        bookInstance.querySelector(".pages").textContent = book.pages;
        bookInstance.querySelector(".has-read").textContent = book.hasRead ? "Yes" : "No";
        bookInstance.querySelector(".delete-button").addEventListener("click", deleteBook);
        bookDisplay.appendChild(bookInstance);

        bookDisplay.lastElementChild.dataset.uuid = id;
    }
}

function changeReadStatus(){

}

function deleteBook(){
    let bookElement = this;
    while (bookElement.className != "book") bookElement = bookElement.parentElement;
    const bookID = bookElement.dataset.uuid;
    books.delete(bookID);
    bookDisplay.removeChild(bookElement);

    console.log(books);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("A Comprehensive Guide To Mapping Taiko", "JarvisGaming", 87, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("A Comprehensive Guide To Mapping Taiko", "JarvisGaming", 87, true);
updateBookDisplay();