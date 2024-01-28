const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung fitur local storage");
        return false
    }
    return true;
}

function saveList() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveList();
}

function composeReadsObject(title, author, year, isComplete) {
    return {
        id: + new Date(),
        title,
        author,
        year,
        isComplete
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId)
            return book;
    }
    return 0;
}

function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromLibrary() {
    const listRead = document.getElementById(READ_LIST_ID);
    let listUnread = document.getElementById(UNREAD_LIST_ID);

    for (book of books) {
        const newRead = showData(book.title, book.author, book.year, book.isComplete);
        newRead[TOREAD_ITEMID] = book.id;

        if (book.isComplete) {
            listRead.append(newRead);
        } else {
            listUnread.append(newRead);
        }
    }
}