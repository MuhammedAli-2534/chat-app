const socket = io.connect('localhost:3000');
const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submitButton = document.getElementById('submit-button');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

submitButton.addEventListener('click', () => {
	socket.emit('chat-message', {
		message: message.value,
		sender: sender.value
	});
	output.innerHTML += '<p><strong>' + sender.value + ': </strong>' + message.value + '</p>';
	message.value = '';
});

message.addEventListener('keydown', (e) => {
	if(e.key == "Enter") {
		socket.emit('chat-message', {
			message: message.value,
			sender: sender.value
		});
		output.innerHTML += '<p><strong>' + sender.value + ': </strong>' + message.value + '</p>';
		message.value = '';
	}
});

socket.on('chat', (data) => {
	output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>';
});