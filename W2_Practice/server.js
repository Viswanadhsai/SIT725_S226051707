const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to Basic Calculator API");
});

// POST - Addition (for Postman)
app.post('/add', (req, res) => {
    const a = parseFloat(req.body.a);
    const b = parseFloat(req.body.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            error: "Invalid input",
            message: "Both a and b must be valid numbers"
        });
    }

    const result = a + b;

    res.json({
        operation: "addition (POST)",
        number1: a,
        number2: b,
        result: result
    });
});

// GET - Addition (for browser)
app.get('/add', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            error: "Invalid input",
            message: "Both a and b must be valid numbers"
        });
    }

    const result = a + b;

    res.json({
        operation: "addition (GET)",
        number1: a,
        number2: b,
        result: result
    });
});

// GET - Subtraction
app.get('/subtract', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            error: "Invalid input",
            message: "Both a and b must be valid numbers"
        });
    }

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

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            error: "Invalid input",
            message: "Both a and b must be valid numbers"
        });
    }

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