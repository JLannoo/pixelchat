const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.querySelector('#message').value;
    const username = document.querySelector('#username').value;

    if(!message || !username) {
        alert("Fill all fields");
    }

    socket.emit('message', { message , username });
});

socket.on('message', (data) => {
    const messages = document.querySelector('.messages');
    const p = document.createElement('p');
    p.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    messages.appendChild(p);
});