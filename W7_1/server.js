const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

let reactionCounts = {
    like: 0,
    laugh: 0,
    angry: 0,
    love: 0
};

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send current counts to new user
    socket.emit('initialCounts', reactionCounts);

    // When a user reacts
    socket.on('reactionEvent', (reactionType) => {
        reactionCounts[reactionType]++;

        // Broadcast updated counts to all clients
        io.emit('updateReactions', reactionCounts);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
