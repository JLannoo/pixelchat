const form = document.querySelector('#chat-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = document.querySelector('#message').value;
    document.querySelector('#message').value = '';

    const username = localStorage.getItem('username');
    if(!username) return;

    if(!message || !username) {
        return alert("Fill all fields");
    }

    socket.emit('message', { message , username });
});

socket.on('message', (data) => {
    const messages = document.querySelector('.messages');

    const message = document.createElement('p');
    const username = document.createElement("strong");
    username.innerText = `${data.username}: `;
    message.appendChild(username);

    message.appendChild(document.createTextNode(data.message));
    message.classList.add('message');

    messages.appendChild(message);
    messages.scrollTo(0, messages.scrollHeight);
});