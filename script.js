const books = new Map();
const bookDisplay = document.querySelector("#books");
const bookTemplate = document.querySelector("template");

const addBookConfirmButton = document.querySelector("#add-book-confirm-button");
const dialog = document.querySelector("#add-book-dialog");

const dialogBookTitle = document.querySelector("#book-dialog");
const dialogBookAuthor = document.querySelector("#book-author");
const dialogBookPages = document.querySelector("#book-pages");
const dialogBookRead = document.querySelector("#book-read");
const form = document.querySelector("#add-book-dialog form");

const library = {
    addBook(title, author, pages, hasRead) {
        const book = new Book(title, author, pages, hasRead);
        books.set(crypto.randomUUID(), book);
    },
    
    updateBookDisplay(){
        // Clear all books, if any
        bookDisplay.innerHTML = "";
    
        for (const [id, book] of books){
            const bookInstance = bookTemplate.content.cloneNode(true);
            bookInstance.querySelector(".title").textContent = book.title;
            bookInstance.querySelector(".author").textContent = book.author;
            bookInstance.querySelector(".pages").textContent = book.pages;
            bookInstance.querySelector(".has-read").textContent = book.hasRead ? "Yes" : "No";
    
            bookInstance.querySelector(".change-read-status-button").addEventListener("click", this._changeReadStatus);
            bookInstance.querySelector(".delete-button").addEventListener("click", this._deleteBook);
    
            bookDisplay.appendChild(bookInstance);
    
            bookDisplay.lastElementChild.dataset.uuid = id;
        }
    },

    _getBookElement(currentElement){
        while (currentElement.className != "book") currentElement = currentElement.parentElement;
        return currentElement;
    },

    _changeReadStatus(){
        const bookElement = library._getBookElement(this)
        const bookID = bookElement.dataset.uuid;
        books.get(bookID).changeHasRead();
        library.updateBookDisplay();
    },
    
    _deleteBook(){
        const bookElement = library._getBookElement(this)
        const bookID = bookElement.dataset.uuid;
        books.delete(bookID);
        library.updateBookDisplay();
    },
}

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

addBookConfirmButton.addEventListener("click", (event) => {
    // Perform client-side validation
    if (!form.reportValidity()) return;

    event.preventDefault();

    const {elements} = form;
    console.log(elements)

    library.addBook(
        elements["book-title"].value,
        elements["book-author"].value,
        elements["book-pages"].value,
        elements["book-read"].checked,
    )
    library.updateBookDisplay();
    
    dialog.close();
});

library.addBook("A Comprehensive Guide To Mapping Taiko", "JarvisGaming", 94, true);
library.addBook("Things to look out for before requesting for BN Checks", "Jerry", 9, false);
library.addBook("History of osu!taiko", "Default Guy", 22, false);
library.addBook("Project Future Sight", "Default Guy", 15, false);
library.updateBookDisplay();