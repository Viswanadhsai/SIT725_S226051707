window.onload = () => {
    fetch('/api/books')
        .then(res => res.json())
        .then(data => renderTimeline(data))
        .catch(err => console.error(err));
};

function renderTimeline(books) {
    const container = document.getElementById('timeline');
    container.innerHTML = "";

    // sort by year ascending
    books.sort((a, b) => a.year - b.year);

    books.forEach(book => {
        const item = document.createElement('div');
        item.className = 'timeline-item';

        const dot = document.createElement('div');
        dot.className = 'timeline-dot ' + getDotClass(book.genre);

        const content = document.createElement('div');
        content.className = 'timeline-content';

        content.innerHTML = `
            <div class="year">📅 ${book.year}</div>
            <div class="title">${book.title}</div>
            <div class="author">👤 ${book.author}</div>
            <div class="meta">🏷️ ${book.genre}</div>
        `;

        item.appendChild(dot);
        item.appendChild(content);
        container.appendChild(item);
    });
}

function getDotClass(genre = '') {
    const g = genre.toLowerCase();
    if (g.includes('science')) return 'dot-sf';
    if (g.includes('classic')) return 'dot-classic';
    if (g.includes('historical')) return 'dot-historical';
    if (g.includes('fantasy')) return 'dot-fantasy';
    return 'dot-default';
}