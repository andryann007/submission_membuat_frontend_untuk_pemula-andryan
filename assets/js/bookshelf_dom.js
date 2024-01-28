const UNREAD_LIST_ID = "unreads";
const READ_LIST_ID = "reads";
const TOREAD_ITEMID = "itemId";
const txtSudahBaca = "Sudah Baca";
const txtBelumBaca = "Belum Baca";
const txtHapus = "Hapus";
const btnSaveBook = document.getElementById('btnSaveBook');

function showData(title, author, year, isComplete) {
    const bookTitle = document.createElement("h5");
    bookTitle.classList.add("card-title");
    bookTitle.innerText = "Judul Buku : " + title;

    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("card-subtitle");
    bookAuthor.innerText = "Penulis Buku : " + author;

    const bookYear = document.createElement("div");
    bookYear.classList.add("card-text");
    bookYear.innerText = "Tahun Terbit : " + year;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("d-flex", "justify-content-end", "mt-3", "gap-3");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    if (isComplete == true) {
        cardHeader.innerText = "Status : " + txtSudahBaca;
    } else {
        cardHeader.innerText = "Status : " + txtBelumBaca;
    }

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.append(bookTitle, bookAuthor, bookYear);

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "p-3");
    cardContainer.append(
        cardHeader,
        cardBody,
        createButtonContainer(isComplete)
    );

    return cardContainer;
}

function addBookList() {
    const uncompletedReadList = document.getElementById(UNREAD_LIST_ID);
    const completedReadList = document.getElementById(READ_LIST_ID);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = Number(document.getElementById("inputBookPublishedYear").value);
    const bookStatus = document.getElementById("inputBookIsReaded").checked;

    if (bookStatus === false) {
        const toRead = showData(bookTitle, bookAuthor, bookYear, false);
        const toReadObject = composeReadsObject(bookTitle, bookAuthor, bookYear, false);

        toRead[TOREAD_ITEMID] = toReadObject.id;
        books.push(toReadObject);

        uncompletedReadList.append(toRead);
        updateDataToStorage();
    } else {
        const alreadyRead = showData(bookTitle, bookAuthor, bookYear, true);
        const readCompletedObject = composeReadsObject(bookTitle, bookAuthor, bookYear, true);

        alreadyRead[TOREAD_ITEMID] = readCompletedObject.id;
        books.push(readCompletedObject);

        completedReadList.append(alreadyRead);
        updateDataToStorage();
    }
}

function createButtonContainer(isComplete) {
    const containerButton = document.createElement("div");
    containerButton.classList.add("d-flex", "justify-content-end", "mt-3", "gap-3");
    if (isComplete === true) {
        containerButton.append(
            createUndoButton(),
            createRemoveButton()
        )

    } else {
        containerButton.append(
            createReadButton(),
            createRemoveButton()
        )
    }

    return containerButton;
}

function createButton(buttonClass1, buttonClass2, innerText, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonClass1, buttonClass2);
    button.classList.add("text-center", "m-2");
    button.innerText = innerText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookToReaded(taskElement) {
    const listReaded = document.getElementById(READ_LIST_ID);

    const toRead = findBook(taskElement[TOREAD_ITEMID]);
    const bookTitle = toRead.title;
    const bookAuthor = toRead.author;
    const bookYear = toRead.year;

    showMoveToReadModal();

    const btnMoveToRead = document.getElementById("btnMoveToRead");
    btnMoveToRead.addEventListener("click", function (event) {
        const newRead = showData(bookTitle, bookAuthor, bookYear, true);
        toRead.isComplete = true;
        newRead[TOREAD_ITEMID] = toRead.id;

        listReaded.append(newRead);
        taskElement.remove();

        updateDataToStorage();
        hideMoveToReadModal();
    });
}

function createReadButton() {
    return createButton("btn", "btn-success", txtSudahBaca, function (event) {
        addBookToReaded(event.target.parentElement.parentElement);
    });
}

function removeFromReaded(taskElement) {
    showDeleteModal();

    const btnDelete = document.getElementById('btnDeleteBook');
    btnDelete.addEventListener("click", function (event) {
        event.preventDefault();

        const toreadPosition = findBookIndex(taskElement[TOREAD_ITEMID]);

        books.splice(toreadPosition, 1);
        taskElement.remove();

        updateDataToStorage();
        hideDeleteModal();
    });
}

function createRemoveButton() {
    return createButton("btn", "btn-danger", txtHapus, function (event) {
        removeFromReaded(event.target.parentElement.parentElement);
    });
}

function undoBookFromReaded(taskElement) {
    const listUnread = document.getElementById(UNREAD_LIST_ID);

    const toRead = findBook(taskElement[TOREAD_ITEMID]);
    const bookTitle = toRead.title;
    const bookAuthor = toRead.author;
    const bookYear = toRead.year;

    showMoveToUnreadModal();

    const btnMoveToUnread = document.getElementById('btnMoveToUnread');
    btnMoveToUnread.addEventListener("click", function (event) {
        event.preventDefault();

        const newRead = showData(bookTitle, bookAuthor, bookYear, false);
        toRead.isComplete = false;
        newRead[TOREAD_ITEMID] = toRead.id;

        listUnread.append(newRead);
        taskElement.remove();

        updateDataToStorage();
        hideMoveToUnreadModal();
    });
}

function createUndoButton() {
    return createButton("btn", "btn-success", txtBelumBaca, function (event) {
        undoBookFromReaded(event.target.parentElement.parentElement);
    });
}

function doBookSearch() {
    const listUnread = document.querySelectorAll('#unreads > .card > .card-body > .card-title');
    const listReaded = document.querySelectorAll('#reads > .card > .card-body > .card-title');
    const query = document.getElementById("searchBookTitle").value.toLowerCase();

    for (unreadBook of listUnread) {
        const unreadBookCard = unreadBook.parentElement.parentElement;

        if (unreadBook.innerText.toLowerCase().includes(query)) {
            if (unreadBookCard.classList.contains('d-none')) {
                unreadBookCard.classList.remove('d-none');
            }
            unreadBookCard.classList.add("d-block");
        } else {
            if (unreadBookCard.classList.contains('d-block')) {
                unreadBookCard.classList.remove('d-block');
            }
            unreadBookCard.classList.add("d-none");
        }
    }

    for (readedBook of listReaded) {
        const readedBookCard = readedBook.parentElement.parentElement;

        if (readedBook.innerText.toLowerCase().includes(query)) {
            if (readedBookCard.classList.contains('d-none')) {
                readedBookCard.classList.remove('d-none');
            }
            readedBookCard.classList.add("d-block");
        } else {
            if (readedBookCard.classList.contains('d-block')) {
                readedBookCard.classList.remove('d-block');
            }
            readedBookCard.classList.add("d-none");
        }
    }
}