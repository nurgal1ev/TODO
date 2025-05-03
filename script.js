const addInput = document.querySelector('#addInput');
const textInput = document.querySelector('#text-input');
const taskContainer = document.querySelector('#taskContainer');
const taskDoneContainer = document.querySelector('#taskDone')


addInput.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskInput = textInput.value;
    const taskAtWork = `
                    <div class="todo-worked__task">
                        <h2 class="task-name" id="nameTask">${taskInput}</h2>
                        <div class="buttons">
                            <button class="input-button" id="buttonDone" data-action="done"><img class="doneTask" src="icons/Check-green.svg" alt="" srcset=""></button>
                            <button class="input-button delete" data-action="delete" id="buttonDelete"><img class="deleteTask" src="icons/delete.svg" alt="" srcset=""></button>
                        </div>
                    </div>`;
    
    taskContainer.insertAdjacentHTML('beforeend', taskAtWork)

    textInput.value = '';
    textInput.focus();
})

taskContainer.addEventListener('click', function (event) {
    if (event.target.dataset.action == 'delete') {
        const parentElement = event.target.closest('.todo-worked__task');
        parentElement.remove();
    }
});


taskContainer.addEventListener('click', function (event) {
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
});

