const getBooksBtn = document.getElementById("getBooksBtn");
const booksContainer = document.getElementById("booksContainer");
const detailsPanel = document.getElementById("detailsPanel");
const detailsText = document.getElementById("detailsText");

getBooksBtn.onclick = loadBooks;

async function loadBooks() {
    const res = await fetch("/api/books");
    const books = await res.json();
    renderBooks(books);
}

function renderBooks(books) {
    booksContainer.innerHTML = "";

    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        // AUTHOR NAME REMOVED FROM CARD
        card.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="spacer"></div>
            <div class="book-price">${book.price} AUD</div>
        `;

        card.onclick = () => showDetails(book);

        booksContainer.appendChild(card);
    });
}

function showDetails(book) {
    detailsPanel.style.display = "block";

    detailsText.innerHTML = `
        <strong>Title:</strong> ${book.title}<br><br>
        <strong>Author:</strong> ${book.author}<br><br>
        <strong>Genre:</strong> ${book.genre}<br><br>
        <strong>Year:</strong> ${book.year}<br><br>
        <strong>Summary:</strong> ${book.summary}<br><br>
        <strong>Price:</strong> ${book.price} AUD<br><br>
        <strong>ID:</strong> ${book._id}
    `;
}