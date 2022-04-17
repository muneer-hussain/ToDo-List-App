let textareaTodo = document.querySelector("#enter-todo")
let textarea = document.querySelector("textarea")
let addBtn = document.querySelector("#addTodo")
let taskBox = document.getElementById("todos")
let filters = document.querySelectorAll("#status span")


let todos = JSON.parse(localStorage.getItem("todos") || "[]");

let isupdate = false,
    updateId;


function showtodos() {
    let todoHTML = ``;
    todos.forEach(
        (todo, index) => {
            todoHTML += `
            <div class="todo-info-wrap">
                 <div class="todo-information">
                    <label for="${index}">
                        <div class="todo-written"><input onclick="updateStatus(this)" type="checkbox" id="${index}">${todo.todoWritten}</div>
                    </label>
                </div>
                        <i class="fa fa-pencil tools" onclick="editTodo(${index}, '${todo.todoWritten}', '${todo.status}')"></i>
                        <i class="fa fa-trash tools" onclick="deleteNote(${index})"></i>
                </div>
             </div>
            `
        })
    taskBox.innerHTML = todoHTML;

}

function editTodo(selectedId, written) {
    textarea.value = written;
    isupdate = true;
    updateId = selectedId;
    textarea.focus();
}



function deleteNote(selectedId) {
    todos.splice(selectedId, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
    showtodos();
}

showtodos();

function addTodo() {
    if (textareaTodo.value != 0) {
        let todoInfo = {
            'todoWritten': textareaTodo.value.trim(),
        }

        if (!isupdate) {
            todos.unshift(todoInfo)
        } else {
            isupdate = false;
            todos[updateId] = todoInfo;
        }
        localStorage.setItem("todos", JSON.stringify(todos))
        showtodos();
        textareaTodo.value = "";
    }
}

addBtn.addEventListener("click", addTodo)
document.addEventListener("keydown", (e) => {
    textarea.focus();
    if (e.keyCode == 13) {
        e.preventDefault();
        addTodo();
    }
})