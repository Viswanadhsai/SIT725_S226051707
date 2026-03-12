// Import Express
const express = require('express');

// Create an Express application
const app = express();

// Define the port number
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to the Calculator API. Use /add?a=number&b=number to add numbers.");
});

// Create a GET endpoint at /add
app.get('/add', (req, res) => {

    // Parse the numbers from the query parameters
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    // Calculate the sum
    const sum = a + b;

    // Send the result as JSON
    res.json({
        number1: a,
        number2: b,
        sum: sum
    });

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});