const addInput = document.querySelector('#addInput');
const textInput = document.querySelector('#text-input');
const taskContainer = document.querySelector('#taskContainer');
const taskDoneContainer = document.querySelector('#taskDone')

addInput.addEventListener('submit', addTask);
taskContainer.addEventListener('click', deleteTask);
taskContainer.addEventListener('click', doneTask);
taskDoneContainer.addEventListener('click', deleteDone);

let tasksArray = [];

if (localStorage.getItem('tasks')) {
    tasksArray = JSON.parse(localStorage.getItem('tasks'))
}

tasksArray.forEach(function (task) {
    const cssClass = task.done ? "task-name done" : "task-name";

    const taskAtWork = `
                    <div id=${task.id} class="todo-worked__task">
                        <h2 class=${cssClass} id="nameTask">${task.text}</h2>
                        <div class="buttons">
                            <button class="input-button" id="buttonDone" data-action="done"><img class="doneTask" src="icons/Check-green.svg" alt="" srcset=""></button>
                            <button class="input-button delete" data-action="delete" id="buttonDelete"><img class="deleteTask" src="icons/delete.svg" alt="" srcset=""></button>
                        </div>
                    </div>`;
    
    taskContainer.insertAdjacentHTML('beforeend', taskAtWork)
});

function addTask(event) {
    if (textInput.value === '') {
        event.preventDefault();
        return
    };

    const taskInput = textInput.value;
    
    const newTask = {
        id: Date.now(),
        text: taskInput,
        done: true
    };

    tasksArray.push(newTask);
    saveToLS();

    const cssClass = newTask.done ? "task-name done" : "task-name";

    const taskAtWork = `
                    <div id=${newTask.id} class="todo-worked__task">
                        <h2 class=${cssClass} id="nameTask">${newTask.text}</h2>
                        <div class="buttons">
                            <button class="input-button" id="buttonDone" data-action="done"><img class="doneTask" src="icons/Check-green.svg" alt="" srcset=""></button>
                            <button class="input-button delete" data-action="delete" id="buttonDelete"><img class="deleteTask" src="icons/delete.svg" alt="" srcset=""></button>
                        </div>
                    </div>`;
    
    taskContainer.insertAdjacentHTML('beforeend', taskAtWork)

    textInput.value = '';
    textInput.focus();
};

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentElement = event.target.closest('.todo-worked__task');

    const parentElementID = Number(parentElement.id);

    tasksArray = tasksArray.filter(function (task) {
        if (task.id === parentElementID) {
            return false
        } else {
            return true
        }
    })
    
    saveToLS();
    
    parentElement.remove();
};

function doneTask(event) {
    if (event.target.dataset.action == 'done') {
        const taskElement = event.target.closest('.todo-worked__task');
        const taskName = taskElement.querySelector('.task-name').textContent;
        const taskAtDone = `
            <div class="todo-worked__task">
                <h2 class="task-name done">${taskName}</h2>
                <button class="input-button delete" id="buttonDeleteDone"><img src="icons/delete.svg" alt="" srcset=""></button>
            </div>`;
    
        taskDoneContainer.insertAdjacentHTML('beforeend', taskAtDone);
        taskElement.remove();
    };
};

function deleteDone(event) {
    if (event.target.id == 'buttonDeleteDone' || 
        event.target.parentElement.id == 'buttonDeleteDone') {
        event.target.closest('.todo-worked__task').remove();
    };
};

function saveToLS() {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
};
