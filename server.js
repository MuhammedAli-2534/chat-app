const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);
const io = socket(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
	console.log(socket.id);
	
	socket.on('chat-message', (data) => {
		socket.broadcast.emit('chat', data);
		console.log('Message from: ', data.sender, 'Message: ', data.message);
	});
});
