const express = require('express');
const app = express();
const port = 3000;

// GET /add - Calculator endpoint
app.get('/add', (req, res) => {
    const { x, y } = req.query;

    // Validation 
    if (!x || !y || isNaN(Number(x)) || isNaN(Number(y))) {
        return res.status(400).json({
            error: "Invalid input",
            message: "Both x and y must be valid numbers"
        });
    }

    const total = Number(x) + Number(y);

    // Response format
    res.json({
        operation: "addition",
        inputs: { x: Number(x), y: Number(y) },
        result: total
    });
});

// Start server
app.listen(port, () => {
    console.log(`Calculator API running at http://localhost:${port}`);
});