 
const socket = io();

document.getElementById('sendButton').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value;
  socket.emit('message', { text: message });
});

socket.on('message', (data) => {
  const messages = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = data.text;
  messages.appendChild(messageElement);
});
