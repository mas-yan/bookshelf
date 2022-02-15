const BOOKS_KEY = "BOOKSHELF_APPS";
const SAVED_EVENT = "saved-book";
const RENDER_EVENT = "render-book";

let books = [];

function isStorageExist() /* boolean */ {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}

function findBook(bookId) {
    for (bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem
        }
    }
    return null
}

function findBookIndex(bookId) {
    for (index in books) {
        if (books[index].id === bookId) {
            return index
        }
    }
    return -1
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(BOOKS_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

function deleteBookFromJson(idBook) {
    for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
        if (books[arrayPosition].id == idBook) {
            books.splice(arrayPosition, 1);
            break;
        }
    }
}

document.addEventListener(RENDER_EVENT, function() {
    const uncompletedBookList = document.getElementById("uncompleted-books");
    const listCompleted = document.getElementById("completed-books");

    // clearing list item
    uncompletedBookList.innerHTML = ""
    listCompleted.innerHTML = ""

    for (bookItem of books) {
        const bookElement = makeBook(bookItem.id, bookItem.title, bookItem.author, bookItem.year, bookItem.isCompleted);
        if (bookItem.isCompleted) {
            listCompleted.append(bookElement);
        } else {
            uncompletedBookList.append(bookElement);
        }
    }
})


function loadDataFromStorage() {
    const serializedData = localStorage.getItem(BOOKS_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (todo of data) {
            books.push(todo);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}