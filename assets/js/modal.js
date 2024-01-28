const inputModal = document.getElementById('inputModal');
const inputModalContent = document.getElementById('inputModalContent');

const confirmationModal = document.getElementById('confirmationModal');
const confirmationContent = document.getElementById('confirmationContent');

const deleteModal = document.getElementById('deleteModal');
const deleteModalContent = document.getElementById('deleteModalContent');

const moveToReadModal = document.getElementById('moveToReadModal');
const moveToReadContent = document.getElementById('moveToReadContent');

const moveToUnreadModal = document.getElementById('moveToUnreadModal');
const moveToUnreadContent = document.getElementById('moveToUnreadContent');

function showInputModal() {
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookPublishedYear").value;
    const bookStatus = document.getElementById("inputBookIsReaded").checked;

    if (bookTitle != "" && bookAuthor != "" && bookYear != "") {
        inputModal.classList.add("show");
        inputModal.style.display = "block";

        const title = document.createElement("p");
        title.id = "bookTitle";
        title.innerText = "Judul Buku : " + bookTitle;

        const author = document.createElement("p");
        author.id = "bookAuthor";
        author.innerText = "Penulis Buku : " + bookAuthor;

        const year = document.createElement("p");
        year.id = "bookYear";
        year.innerText = "Tahun Terbit : " + bookYear;

        const status = document.createElement("p");
        status.id = "bookStatus";

        if (bookStatus == true) {
            status.innerText = "Status : Sudah Baca";
        } else {
            status.innerText = "Status : Belum Baca";
        }

        const modalBody = document.createElement("div");
        modalBody.id = "inputModalBody"
        modalBody.classList.add("modal-body");
        modalBody.append(title, author, year, status);

        const inputModalContentChild = inputModalContent.children;
        const midIndex = Math.floor(inputModalContentChild.length / 2);
        inputModalContent.insertBefore(modalBody, inputModalContentChild[midIndex]);
    } else {
        showConfirmationModal();
        inputModal.classList.remove("show");
        inputModal.style.display = "none";
    }
}

function showConfirmationModal() {
    if (confirmationModal.classList.contains("none")) {
        confirmationModal.classList.remove("none");
    }
    confirmationModal.classList.add("show");
    confirmationModal.style.display = "block";

    const title = document.createElement("h5");
    title.classList.add("card-title", "text-center");
    title.innerText = "Harap Isi Judul, Penulis, & Tahun Terbit Buku !!!";

    const titleContainer = document.createElement("div");
    titleContainer.append(title);

    const modalBody = document.createElement("div");
    modalBody.id = "confirmationModalBody"
    modalBody.classList.add("modal-body");
    modalBody.append(titleContainer);

    const confirmationContentChild = confirmationContent.children;
    const midIndex = Math.floor(confirmationContentChild.length / 2);
    confirmationContent.insertBefore(modalBody, confirmationContentChild[midIndex]);
}

function showDeleteModal() {
    if (deleteModal.classList.contains("none")) {
        deleteModal.classList.remove("none");
    }
    deleteModal.classList.add("show");
    deleteModal.style.display = "block";

    const title = document.createElement("h5");
    title.classList.add("card-title", "text-center");
    title.innerText = "Apakah Kamu Yakin Menghapus Buku Ini ?";

    const titleContainer = document.createElement("div");
    titleContainer.append(title);

    const modalBody = document.createElement("div");
    modalBody.id = "deleteModalBody"
    modalBody.classList.add("modal-body");
    modalBody.append(titleContainer);

    const deleteModalContentChild = deleteModalContent.children;
    const midIndex = Math.floor(deleteModalContentChild.length / 2);
    deleteModalContent.insertBefore(modalBody, deleteModalContentChild[midIndex]);
}

function showMoveToReadModal() {
    if (moveToReadModal.classList.contains("none")) {
        moveToReadModal.classList.remove("none");
    }
    moveToReadModal.classList.add("show");
    moveToReadModal.style.display = "block";

    const title = document.createElement("h5");
    title.classList.add("card-title", "text-center");
    title.innerText = "Apakah Kamu Sudah Yakin ?";

    const titleContainer = document.createElement("div");
    titleContainer.append(title);

    const modalBody = document.createElement("div");
    modalBody.id = "moveToReadModalBody"
    modalBody.classList.add("modal-body");
    modalBody.append(titleContainer);

    const moveToReadContentChild = moveToReadContent.children;
    const midIndex = Math.floor(moveToReadContentChild.length / 2);
    moveToReadContent.insertBefore(modalBody, moveToReadContentChild[midIndex]);
}

function showMoveToUnreadModal() {
    if (moveToUnreadModal.classList.contains("none")) {
        moveToUnreadModal.classList.remove("none");
    }
    moveToUnreadModal.classList.add("show");
    moveToUnreadModal.style.display = "block";

    const title = document.createElement("h5");
    title.classList.add("card-title", "text-center");
    title.innerText = "Apakah Kamu Sudah Yakin ?";

    const titleContainer = document.createElement("div");
    titleContainer.append(title);

    const modalBody = document.createElement("div");
    modalBody.id = "moveToUnreadModalBody"
    modalBody.classList.add("modal-body");
    modalBody.append(titleContainer);

    const moveToUnreadContentChild = moveToUnreadContent.children;
    const midIndex = Math.floor(moveToUnreadContentChild.length / 2);
    moveToUnreadContent.insertBefore(modalBody, moveToUnreadContentChild[midIndex]);
}

function hideInputModal() {
    inputModal.classList.remove("show");
    inputModal.style.display = "none";

    const modalBody = document.getElementById("inputModalBody");
    inputModalContent.removeChild(modalBody);
}

function hideConfirmationModal() {
    if (confirmationModal.classList.contains("show")) {
        confirmationModal.classList.remove("show");
    }
    confirmationModal.classList.add("none");
    confirmationModal.style.display = "none";

    const modalBody = document.getElementById("confirmationModalBody");
    confirmationContent.removeChild(modalBody);
}

function hideDeleteModal() {
    if (deleteModal.classList.contains("show")) {
        deleteModal.classList.remove("show");
    }
    deleteModal.classList.add("none");
    deleteModal.style.display = "none";

    const modalBody = document.getElementById("deleteModalBody");
    deleteModalContent.removeChild(modalBody);
}

function hideMoveToReadModal() {
    if (moveToReadModal.classList.contains("show")) {
        moveToReadModal.classList.remove("show");
    }
    moveToReadModal.classList.add("none");
    moveToReadModal.style.display = "none";

    const modalBody = document.getElementById("moveToReadModalBody");
    moveToReadContent.removeChild(modalBody);
}

function hideMoveToUnreadModal() {
    if (moveToUnreadModal.classList.contains("show")) {
        moveToUnreadModal.classList.remove("show");
    }
    moveToUnreadModal.classList.add("none");
    moveToUnreadModal.style.display = "none";

    const modalBody = document.getElementById("moveToUnreadModalBody");
    moveToUnreadContent.removeChild(modalBody);
}