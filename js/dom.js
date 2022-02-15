const UNCOMPLETED_LIST_BOOK_ID = "item";
const COMPLETED_LIST_BOOK_ID = "completed-books";

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const completed = document.getElementById('completed').checked;

    const id = generateId()
    const book = makeBook(id, title, author, year, completed);
    const bookObject = generateBookObject(id, title, author, year, completed)
    books.push(bookObject)

    if (completed) {
        document.getElementById(COMPLETED_LIST_BOOK_ID).append(book);
    } else {
        document.getElementById(UNCOMPLETED_LIST_BOOK_ID).append(book);
    }
    saveData()
}

function makeBook(idBook, title, author, year, isCompleted) {
    const textTitle = document.createElement("h5");
    textTitle.innerText = title;
    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;
    const textYear = document.createElement("p");
    textYear.innerText = year;
    const row = document.createElement('div');
    row.classList.add("row");
    const firstCol = document.createElement('div');
    firstCol.classList.add("col-6");
    const secondCol = document.createElement('div');
    secondCol.classList.add("col-6", 'text-end');
    const cardHeader = document.createElement('div');
    cardHeader.classList.add("card-header", "bg-white");
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const card = document.createElement('div')
    card.classList.add('card', 'shadow', 'mt-3');
    // card.setAttribute("id", idBook)

    cardHeader.append(textTitle);
    firstCol.append(textAuthor, textYear);
    if (isCompleted) {
        secondCol.append(createUndoButton(idBook), createTrashButton(idBook));
    } else {
        secondCol.append(createCheckButton(idBook), createTrashButton(idBook));
    }
    row.append(firstCol, secondCol);
    cardBody.append(row);
    card.append(cardHeader, cardBody);
    return card;
}

function createButton(eventListener, text, ...buttonTypeClass) {
    const button = document.createElement("button");
    for (let buttonClass of buttonTypeClass) {
        button.classList.add(buttonClass);
    }
    button.textContent = text;
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}

function createCheckButton(id) {
    return createButton(function(event) {
        // const card = document.getElementById('idBook');
        const target = event.target.parentElement.parentElement.parentElement.parentElement
        addTaskToCompleted(target, id);
    }, 'selesai', 'btn', 'btn-success', 'mx-1');
}

function addTaskToCompleted(taskElement, id) {
    const taskTitle = taskElement.querySelector(".card > .card-header > h5").innerText;
    const item = taskElement.querySelectorAll("p");
    const taskAuthor = item[0].innerText;
    const taskYear = item[1].innerText;

    const newBook = makeBook(id, taskTitle, taskAuthor, taskYear, true);
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    listCompleted.append(newBook);
    taskElement.remove();
    const bookTarget = findBook(id);
    if (bookTarget == null) return;
    bookTarget.isCompleted = true
    saveData()
}

function removeTaskFromCompleted(taskElement, id) {
    let confirmation = confirm("apakah anda yakin ingin menghapus buku?");

    if (confirmation) {
        taskElement.remove();
    }
    deleteBookFromJson(id);
    saveData()
}

function createTrashButton(id) {
    return createButton(function(event) {
        const target = event.target.parentElement.parentElement.parentElement.parentElement
        removeTaskFromCompleted(target, id);
    }, 'Hapus', 'btn', 'btn-danger');
}

function undoTaskFromCompleted(taskElement, id) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const taskTitle = taskElement.querySelector(".card > .card-header > h5").innerText;
    const item = taskElement.querySelectorAll("p");
    const taskAuthor = item[0].innerText;
    const taskYear = item[1].innerText;

    const newBook = makeBook(id, taskTitle, taskAuthor, taskYear, false);

    listUncompleted.append(newBook);
    taskElement.remove();
    const bookTarget = findBook(id);
    if (bookTarget == null) return;
    bookTarget.isCompleted = false
    saveData()
}

function createUndoButton(id) {
    return createButton(function(event) {
        const target = event.target.parentElement.parentElement.parentElement.parentElement
        undoTaskFromCompleted(target, id);
    }, 'Belum', 'btn', 'btn-success', 'mx-1');
}