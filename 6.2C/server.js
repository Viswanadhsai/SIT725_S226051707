const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to Express Server");
});

app.get('/hello', (req, res) => {
    res.status(200).json({ message: "Hello world" });
});

function addNumbers(a, b) {
    return a + b;
}

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

module.exports = { app, addNumbers };
