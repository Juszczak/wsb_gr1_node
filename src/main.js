const NOTES_URL = '/notes';

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content'); // ul
  const todos = document.getElementById('todos'); // form
  const todo = document.getElementById('todo'); // input
  const requestHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  todos.addEventListener('submit', event => {
    event.preventDefault();
    const note = todo.value;
    todo.value = '';

    const body = {note: note};

    addNote(note);

    fetch(NOTES_URL, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(body),
    }).then(res => {});
  });

  function addNote(note) {
    const element = document.createElement('li');
    element.innerText = note;
    content.appendChild(element);

    element.addEventListener('click', event => {
      fetch(NOTES_URL, {
        method: 'DELETE',
        headers: requestHeaders,
        body: JSON.stringify({note: note}),
      }).then(res => {
        content.removeChild(element);
      });
    });
  }

  fetch(NOTES_URL)
    .then(res => res.json())
    .then(body => {
      content.innerHTML = '';
      const notes = body.notes;
      notes.forEach(note => addNote(note));
    });

  const login = document.getElementById('login');
  const name = document.getElementById('name');
  const password = document.getElementById('password');
  const status = document.getElementById('status')

  login.addEventListener('submit', event => {
    event.preventDefault();
    status.innerText = 'Authenticating';

    fetch('/auth', {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({name: name.value, password: password.value}),
    })
      .then(res => res.json())
      .then(body => {
        status.innerText = body.success === true ? 'SUCCESS' : body.error;
      });
  });
});
