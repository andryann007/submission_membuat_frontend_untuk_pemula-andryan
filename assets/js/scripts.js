document.addEventListener("DOMContentLoaded", function () {
    const inputForm = document.getElementById("inputBookData");

    inputForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBookList();
    })

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromLibrary();
});