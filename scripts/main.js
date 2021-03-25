var qaydlarSoni = document.querySelector('#qandlar-soni');
var qaydForm = document.querySelector('#qayd-form');
var qaydInput = document.querySelector('#qayd-input');
var qaydListQoshatr = document.querySelector('#qayd-list-qoshatr');

var idQoshatr = 0;
var todos = [];

// qolip yasadik, yani prototype 

function TodoItemPrototype(title, id) {
    this.title = title;
    this.id = id;
}

// yangoi list qoshish funksiyasi

function listQoshatr(todoTitle, idQoshatr) {

    //createElement - html ga element qoshib beradi
    var listcreate = document.createElement('li');
    //appenChild push ning bir turi lekin bir hil ishledi 
    qaydListQoshatr.appendChild(listcreate);
    //textContent html ga text yozib beradi
    // listcreate.textContent = todoTitle;
    //setrAttribute html ga atribut qoshib beradi
    listcreate.setAttribute('id', `todo-item-${idQoshatr}`);
    listcreate.setAttribute('class', 'list-group-item d-flex align-items-center justify-content-between');

    var editInput = document.createElement('input');
    editInput.setAttribute('class', `edit-input`);
    editInput.value = todoTitle;
    listcreate.appendChild(editInput);
    editInput.disabled = true;

    listcreate.addEventListener('dblclick', function () {
        editInput.disabled = false;
        editInput.focus();
    })

    editInput.addEventListener('blur', function () {
        if (editInput.value.length > 0) {
            editInput.disabled = true;
            editInput.style.borderBottomColor = 'transparent'
        } else {
            editInput.style.borderBottomColor = 'red'
        }
    })

    editInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (editInput.value.length > 0) {
                editInput.disabled = true;
                editInput.style.borderBottomColor = 'transparent'
            } else {
                editInput.style.borderBottomColor = 'red'
            }
        }
    })

    var deleteButton = document.createElement('button');
    deleteButton.textContent = `o'chirish`;
    deleteButton.setAttribute('class', 'btn btn-outline-danger');
    listcreate.appendChild(deleteButton);


    deleteButton.addEventListener('click', function (e) {
        e.preventDefault();
        removeTodo(idQoshatr);

    })
}

//qoshilgan listlarni ochirish funksiyasi

function removeTodo(idQoshatr) {
    document.querySelector(`#todo-item-${idQoshatr}`).remove();
    qaydlarSoni.innerHTML = todos.length;
    for (i = 0; i < todos.length; i++) {
        if (todos[i].id == idQoshatr) {
            //slice alertdan ochirib beradi 
            todos.splice(i, 1);
        }
    }

    console.log(todos);
    qaydlarSoni.innerHTML = todos.length;


}

function createTodo(todoTitle) {
    todos.push(new TodoItemPrototype(todoTitle, idQoshatr));

    listQoshatr(todoTitle, idQoshatr);

    idQoshatr++;
}

qaydForm.addEventListener('submit', function (e) {
    e.preventDefault();
    createTodo(qaydInput.value);


    qaydlarSoni.innerHTML = todos.length;

    qaydForm.reset();

    

})

