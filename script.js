const books = new Map();
const bookDisplay = document.querySelector("#books");
const bookTemplate = document.querySelector("template")

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

library.addBook("The Hobbit", "J.R.R. Tolkien", 295, false);
library.addBook("A Comprehensive Guide To Mapping Taiko", "JarvisGaming", 87, true);
library.addBook("The Hobbit", "J.R.R. Tolkien", 295, false);
library.addBook("A Comprehensive Guide To Mapping Taiko", "JarvisGaming", 87, true);
library.updateBookDisplay();