const notesList = JSON.parse(localStorage.getItem('notesList'));

if (notesList) {
    notesList.forEach(note => {
        addNewNote(note);
    });
}

const addNote = document.getElementById('add-note');

addNote.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(message = "") {
    const noteElement = document.createElement('div');

    noteElement.classList.add('note');

    noteElement.innerHTML = `
        <div class="note__tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fa fa-trash-alt"></i></button>
        </div>

        <div class="note__text ${message ? '' : 'hidden'}"></div>
        <textarea class=${message ? 'hidden' : ''} id="" cols="40" rows="10"></textarea>
    `;

    const editButton = noteElement.querySelector('.edit');
    const deleteButton = noteElement.querySelector('.delete');
    const textElement = noteElement.querySelector('.note__text');
    const textarea = noteElement.querySelector('textarea');

    textarea.value = message;
    textElement.innerHTML = marked.parse(textarea.value);

    editButton.addEventListener("click", () => {
        textElement.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    deleteButton.addEventListener('click', () => {
        noteElement.remove();
        updateLocalStorage();
    });

    textarea.addEventListener("input", (e) => {
        const { value } = e.target;
        textElement.innerHTML = marked.parse(value);
        updateLocalStorage();
    });

    document.body.appendChild(noteElement);
}


function updateLocalStorage() {
    const notesText = document.querySelectorAll('textarea');
    const notesList = [];

    notesText.forEach(note => {
        notesList.push(note.value);
    });

    localStorage.setItem('notesList', JSON.stringify(notesList));
}
