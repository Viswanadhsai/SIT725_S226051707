const express = require('express');
const app = express();
const port = 3000;

// GET /add - required endpoint
app.get('/add', (req, res) => {
    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);
    // Calculate the sum and send the response
    const sum = x + y;
    res.send(`The sum of ${x} and ${y} is ${sum}`);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});