const express = require('express');
const app = express();
const path = require('path');

const booksRoute = require('./routes/booksRoute');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/books', booksRoute);

const PORT = 3004;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});