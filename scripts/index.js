const todoList = document.querySelector('.todolist');
const form = document.querySelector('#add-todo');
const val = document.getElementById('todo-in')

function renderTodo(doc) {
    let todo = document.createElement('li')

    let span = document.createElement('span')
    span.setAttribute('id',doc.id)
    let strong = document.createElement('strong')
    todo.innerText = doc.data().name;
    todo.setAttribute('class','list')
    todo.setAttribute('data-id',doc.id)
    strong.innerText = 'X'
    span.appendChild(strong)
    todo.appendChild(span)


    todoList.appendChild(todo)
    //deleting data
    strong.addEventListener('click',(e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('id');
        db.collection('todos').doc(id).delete()
    })
}

form.addEventListener('submit',(e) => {
    console.log(val.value)
    e.preventDefault();
    if (val.value != ''){
    db.collection('todos').add({
        name: val.value
    })
    val.value = ''
}else{
    alert('Do no input empty string!')
}
})


db.collection('todos').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderTodo(change.doc)
        }else if (change.type == 'removed'){
            let li = todoList.querySelector('[data-id='+change.doc.id+']')
            todoList.removeChild(li)
        }
    })
})