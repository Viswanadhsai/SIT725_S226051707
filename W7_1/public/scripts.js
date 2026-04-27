const socket = io();

function sendReaction(type) {
    socket.emit('reactionEvent', type);
}

socket.on('initialCounts', (counts) => {
    updateUI(counts);
});

socket.on('updateReactions', (counts) => {
    updateUI(counts);
});

function updateUI(counts) {
    document.getElementById('likeCount').textContent = counts.like;
    document.getElementById('laughCount').textContent = counts.laugh;
    document.getElementById('angryCount').textContent = counts.angry;
    document.getElementById('loveCount').textContent = counts.love;
}
