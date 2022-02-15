document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    form.addEventListener("submit", function name(event) {
        event.preventDefault();
        addBook();
    })
    if (isStorageExist()) {
        loadDataFromStorage();
    }
})