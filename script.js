let books = [];

async function loadBooks() {
    const res = await fetch('library.json');
    books = await res.json();
    displayBooks(books);
}

function displayBooks(list) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    list.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book';
        div.innerHTML = `
            <div class="title">${book.title}</div>
            <div class="author"><strong>Author:</strong> ${book.author}</div>
            <div class="year"><strong>Year:</strong> ${book.year}</div>
            <div class="category"><strong>Category:</strong> ${book.category}</div>
            <div class="location"><strong>Location:</strong> ${book.location}</div>
            <div class="tags"><strong>Tags:</strong> ${book.tags}</div>
        `;
        container.appendChild(div);
    });
}

document.getElementById('searchBox').addEventListener('input', function() {
    const query = this.value.toLowerCase();

    const filtered = books.filter(book =>
        (book.title && book.title.toLowerCase().includes(query)) ||
        (book.author && book.author.toLowerCase().includes(query)) ||
        (book.category && book.category.toLowerCase().includes(query)) ||
        (book.tags && book.tags.join(' ').toLowerCase().includes(query)) ||
        (book.year && String(book.year).includes(query))
    );

    displayBooks(filtered);
});

loadBooks();

