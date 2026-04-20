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

// ----------------------
// MULTIPLICATION FUNCTION
// ----------------------
function multiplyNumbers(a, b) {
    return a * b;
}

// ----------------------
// MULTIPLY API ENDPOINT
// ----------------------
app.get('/multiply', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const result = multiplyNumbers(a, b);
    res.json({ result });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

module.exports = { app, multiplyNumbers };
