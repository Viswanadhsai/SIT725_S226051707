const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Welcome to Basic Calculator API");
});

// POST - Addition 
app.post('/add', (req, res) => {
    const a = parseFloat(req.body.a);
    const b = parseFloat(req.body.b);

    const result = a + b;

    res.json({
        operation: "addition",
        number1: a,
        number2: b,
        result: result
    });
});

// GET - Subtraction 
app.get('/subtract', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    const result = a - b;

    res.json({
        operation: "subtraction",
        result: result
    });
});

// GET - Multiplication 
app.get('/multiply', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    const result = a * b;

    res.json({
        operation: "multiplication",
        result: result
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});