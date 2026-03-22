const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// GET /add - Calculator endpoint
app.get('/add', (req, res) => {
    const { x, y } = req.query;

    if (!x || !y || isNaN(Number(x)) || isNaN(Number(y))) {
        return res.status(400).json({
            error: "Invalid input",
            message: "Both x and y must be valid numbers"
        });
    }

    const total = Number(x) + Number(y);

    res.json({
        operation: "addition",
        inputs: { x: Number(x), y: Number(y) },
        result: total
    });
});

app.listen(port, () => {
    console.log(`Calculator API running at http://localhost:${port}`);
});