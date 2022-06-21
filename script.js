let textareaTodo = document.querySelector("#enter-todo")
let textarea = document.querySelector("textarea")
let addBtn = document.querySelector("#addTodo")
let taskBox = document.getElementById("todos")
let filters = document.querySelectorAll("#status span")
let TasksLength = document.getElementById("tasks-length")



let todos = JSON.parse(localStorage.getItem("todos") || "[]");

let isupdate = false,
    updateId;

    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector("span.active").classList.remove("active");
            btn.classList.add("active");
            showtodos(btn.id)
        })
    })


function showtodos(filters) {
    let todoHTML = ``;
    todos.forEach((todo, index) => {
         let completed = todo.status == "completed" ? "checked" : "";
        if (filters == todo.status || filters == "all") {    
            todoHTML += `
            <div class="todo-info-wrap">
                 <div class="todo-information">
                    <label for="${index}">
                        <div class="todo-written">
                        <input onclick="updateStatus(this, '${filters}')" type="checkbox" id="${index}" ${completed}>
                        <span class="${completed}">${todo.todoWritten}</span>
                        </div>
                    </label>
                </div>
                        <i class="fa fa-pencil tools" onclick="editTodo(${index}, '${todo.todoWritten}')"></i>
                        <i class="fa fa-trash tools" onclick="deleteNote(${index}, '${filters}')"></i>
                </div>
             </div>
            `   
        }
     })
        taskBox.innerHTML = todoHTML;
        length(filters);


}



showtodos("all")


function updateStatus(selectedTask, filter){
    let taskName = selectedTask.parentElement;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todos))
    setTimeout(showtodos(filter), 200);
}

function editTodo(selectedId, written) {
    textarea.value = written;
    isupdate = true;
    updateId = selectedId;
    textarea.focus();
}


function deleteNote(selectedId, filterdlt) {
    todos.splice(selectedId, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
    showtodos(filterdlt);
}


function length(filters) {
    let pending = 0;
    let completed = 0;

    todos.forEach((todo) => {
        if(todo.status == 'pending') {
            pending = pending + 1;
        }

        if(todo.status == 'completed') {
            completed = completed + 1;
        }

    });

    let task_s = 'Task = ';
    let length = todos.length;

    if (filters == 'all'){
        length > 1 ? task_s = 'Tasks = ' : task_s = task_s; 
        TasksLength.innerHTML = task_s + " " + todos.length;
  
    }
    if (filters == 'pending') {
            pending > 1 ? task_s = 'Tasks = ' : task_s = task_s; 
            TasksLength.innerHTML = task_s + pending;
    }

    if (filters == 'completed') {
        completed > 1 ? task_s = 'Tasks = ' : task_s = task_s; 
        TasksLength.innerHTML =  task_s + completed;
    }
}


function addTodo() {
     let userTask = textareaTodo.value.trim();
    if (textareaTodo.value != 0) {
        let todoInfo = {
            'todoWritten': userTask,
            'status': 'pending',
        }

        if (!isupdate) {
            todos.unshift(todoInfo)
        } else {
            isupdate = false;
            todos[updateId].todoWritten = userTask;
        }
        localStorage.setItem("todos", JSON.stringify(todos))
        showtodos(document.querySelector("span.active"));
        textareaTodo.value = "";
    }

            textareaTodo.value = "";
            localStorage.setItem("todos", JSON.stringify(todos));
            showtodos(document.querySelector("span.active").id);


}

//          ToDo will add when user press enter key 


addBtn.addEventListener("click", addTodo)
document.addEventListener("keydown", (e) => {
    textarea.focus();
    if (e.keyCode == 13) {
        e.preventDefault();
        addTodo();

    }
})
